"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var PHPUse_1 = require("./PHPUse");
var PHPClass = /** @class */ (function () {
    function PHPClass(className, documentUri) {
        this.methods = [];
        this.uses = [];
        this._classNameArray = [];
        this.className = className;
        this.documentUri = documentUri;
        this._classNameArray = this.className.split('\\');
    }
    PHPClass.prototype.addMethod = function (method) {
        this.methods.push(method);
    };
    PHPClass.prototype.isInNamespaceOf = function (namespace) {
        return this._classNameArray.indexOf(namespace) != -1;
    };
    PHPClass.prototype.isController = function () {
        return this.isInNamespaceOf('Controller');
    };
    Object.defineProperty(PHPClass.prototype, "shortClassName", {
        get: function () {
            return this._classNameArray[this._classNameArray.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    PHPClass.fromJSON = function (jsonPhpClass) {
        var uri = vscode.Uri.file(jsonPhpClass.documentUri.fsPath);
        var position = new vscode.Position(jsonPhpClass.classPosition.line, jsonPhpClass.classPosition.character);
        var phpClass = new PHPClass(jsonPhpClass.className, uri);
        phpClass.classPosition = position;
        jsonPhpClass.methods.forEach(function (method) {
            phpClass.addMethod(method);
        });
        jsonPhpClass.uses.forEach(function (use) {
            phpClass.uses.push(new PHPUse_1.PHPUse(use.className, use.alias));
        });
        return phpClass;
    };
    return PHPClass;
}());
exports.PHPClass = PHPClass;
