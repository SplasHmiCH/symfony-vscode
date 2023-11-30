"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const PHPClass_1 = require("../PHPClass");
const php_parser_1 = require("php-parser");
const graceful_fs_1 = require("graceful-fs");
const PromiseUtils_1 = require("../PromiseUtils");
const PHPUse_1 = require("../PHPUse");
class ParserPHPClassProvider {
    constructor() {
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
    canUpdateAllUris() {
        return true;
    }
    canUpdateUri(uri) {
        return true;
    }
    updateAllUris() {
        return new Promise((resolve, reject) => {
            vscode.workspace.findFiles("**/*.php").then(uris => {
                let ps = [];
                uris.forEach(uri => {
                    ps.push(() => this.updateUri(uri));
                });
                PromiseUtils_1.PromiseUtils.throttleActions(ps, this._getParserThrottle()).then(phpClassesArray => {
                    let resultArray = [];
                    phpClassesArray.map(phpClasses => {
                        let filteredArray = phpClasses.filter(phpClass => {
                            return phpClass !== null;
                        });
                        resultArray = resultArray.concat(filteredArray);
                    });
                    resolve(resultArray);
                }).catch(reason => {
                    reject(reason);
                });
            });
        });
    }
    updateUri(uri) {
        return new Promise((resolve) => {
            graceful_fs_1.readFile(uri.fsPath, (err, data) => {
                if (err) {
                    resolve([]);
                }
                else {
                    try {
                        let ast = this._engine.parseCode(data.toString());
                        resolve(this._hydratePHPClass(ast, uri));
                    }
                    catch (e) {
                        resolve([]);
                    }
                }
            });
        });
    }
    _hydratePHPClass(ast, uri) {
        try {
            let result = [];
            let children = ast.children;
            let nextElementsToProcess = children;
            let currentElement = null;
            let currentNamespace = null;
            let uses = [];
            while (nextElementsToProcess.length > 0) {
                currentElement = nextElementsToProcess.shift();
                if (currentElement.kind === "namespace") {
                    currentNamespace = currentElement.name;
                    nextElementsToProcess = currentElement.children;
                }
                if (currentElement.kind === "usegroup") {
                    uses = uses.concat(this._processUseGroup(currentElement));
                }
                if (currentElement.kind === "class" || currentElement.kind === "interface") {
                    result.push(this._processClass(currentElement, uri, currentNamespace));
                }
            }
            result.forEach(phpClass => {
                phpClass.uses = uses;
            });
            return result;
        }
        catch (e) {
            return [];
        }
    }
    _processClass(element, uri, namespace) {
        let fullName = null;
        if (typeof element.name === "object") {
            fullName = element.name.name;
        }
        else if (typeof element.name === "string") {
            fullName = element.name;
        }
        if (namespace) {
            fullName = namespace + '\\' + fullName;
        }
        let phpClass = new PHPClass_1.PHPClass(fullName, uri);
        element.body.forEach(classElement => {
            if (classElement.kind === "method") {
                phpClass.addMethod(classElement.name.name);
            }
        });
        phpClass.classPosition = new vscode.Position(element.loc.start.line, element.loc.start.column);
        return phpClass;
    }
    _processUseGroup(element) {
        let result = [];
        element.items.forEach(item => {
            result.push(new PHPUse_1.PHPUse(item.name, item.alias));
        });
        return result;
    }
    _getParserThrottle() {
        return this._configuration.get("phpParserThrottle");
    }
}
exports.ParserPHPClassProvider = ParserPHPClassProvider;
//# sourceMappingURL=ParserPHPClassProvider.js.map