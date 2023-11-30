"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var PHPClass_1 = require("../PHPClass");
var php_parser_1 = require("php-parser");
var graceful_fs_1 = require("graceful-fs");
var PromiseUtils_1 = require("../PromiseUtils");
var PHPUse_1 = require("../PHPUse");
var ParserPHPClassProvider = /** @class */ (function () {
    function ParserPHPClassProvider() {
        this._configuration = vscode.workspace.getConfiguration("symfony-vscode");
        this._engine = new php_parser_1.default({
            parser: {
                php7: true
            },
            ast: {
                withPositions: true
            }
        });
    }
    ParserPHPClassProvider.prototype.canUpdateAllUris = function () {
        return true;
    };
    ParserPHPClassProvider.prototype.canUpdateUri = function (uri) {
        return true;
    };
    ParserPHPClassProvider.prototype.updateAllUris = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            vscode.workspace.findFiles("**/*.php").then(function (uris) {
                var ps = [];
                uris.forEach(function (uri) {
                    ps.push(function () { return _this.updateUri(uri); });
                });
                PromiseUtils_1.PromiseUtils.throttleActions(ps, _this._getParserThrottle()).then(function (phpClassesArray) {
                    var resultArray = [];
                    phpClassesArray.map(function (phpClasses) {
                        var filteredArray = phpClasses.filter(function (phpClass) {
                            return phpClass !== null;
                        });
                        resultArray = resultArray.concat(filteredArray);
                    });
                    resolve(resultArray);
                }).catch(function (reason) {
                    reject(reason);
                });
            });
        });
    };
    ParserPHPClassProvider.prototype.updateUri = function (uri) {
        var _this = this;
        return new Promise(function (resolve) {
            graceful_fs_1.readFile(uri.fsPath, function (err, data) {
                if (err) {
                    resolve([]);
                }
                else {
                    try {
                        var ast = _this._engine.parseCode(data.toString());
                        resolve(_this._hydratePHPClass(ast, uri));
                    }
                    catch (e) {
                        resolve([]);
                    }
                }
            });
        });
    };
    ParserPHPClassProvider.prototype._hydratePHPClass = function (ast, uri) {
        try {
            var result = [];
            var children = ast.children;
            var nextElementsToProcess = children;
            var currentElement = null;
            var currentNamespace = null;
            var uses_1 = [];
            while (nextElementsToProcess.length > 0) {
                currentElement = nextElementsToProcess.shift();
                if (currentElement.kind === "namespace") {
                    currentNamespace = currentElement.name;
                    nextElementsToProcess = currentElement.children;
                }
                if (currentElement.kind === "usegroup") {
                    uses_1 = uses_1.concat(this._processUseGroup(currentElement));
                }
                if (currentElement.kind === "class" || currentElement.kind === "interface") {
                    result.push(this._processClass(currentElement, uri, currentNamespace));
                }
            }
            result.forEach(function (phpClass) {
                phpClass.uses = uses_1;
            });
            return result;
        }
        catch (e) {
            return [];
        }
    };
    ParserPHPClassProvider.prototype._processClass = function (element, uri, namespace) {
        var fullName = null;
        if (typeof element.name === "object") {
            fullName = element.name.name;
        }
        else if (typeof element.name === "string") {
            fullName = element.name;
        }
        if (namespace) {
            fullName = namespace + '\\' + fullName;
        }
        var phpClass = new PHPClass_1.PHPClass(fullName, uri);
        element.body.forEach(function (classElement) {
            if (classElement.kind === "method") {
                phpClass.addMethod(classElement.name.name);
            }
        });
        phpClass.classPosition = new vscode.Position(element.loc.start.line, element.loc.start.column);
        return phpClass;
    };
    ParserPHPClassProvider.prototype._processUseGroup = function (element) {
        var result = [];
        element.items.forEach(function (item) {
            result.push(new PHPUse_1.PHPUse(item.name, item.alias));
        });
        return result;
    };
    ParserPHPClassProvider.prototype._getParserThrottle = function () {
        return this._configuration.get("phpParserThrottle");
    };
    return ParserPHPClassProvider;
}());
exports.ParserPHPClassProvider = ParserPHPClassProvider;
