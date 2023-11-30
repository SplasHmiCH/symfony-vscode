"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const PHPUse_1 = require("./PHPUse");
class PHPClass {
    constructor(className, documentUri) {
        this.methods = [];
        this.uses = [];
        this._classNameArray = [];
        this.className = className;
        this.documentUri = documentUri;
        this._classNameArray = this.className.split('\\');
    }
    addMethod(method) {
        this.methods.push(method);
    }
    isInNamespaceOf(namespace) {
        return this._classNameArray.indexOf(namespace) != -1;
    }
    isController() {
        return this.isInNamespaceOf('Controller');
    }
    get shortClassName() {
        return this._classNameArray[this._classNameArray.length - 1];
    }
    static fromJSON(jsonPhpClass) {
        let uri = vscode.Uri.file(jsonPhpClass.documentUri.fsPath);
        let position = new vscode.Position(jsonPhpClass.classPosition.line, jsonPhpClass.classPosition.character);
        let phpClass = new PHPClass(jsonPhpClass.className, uri);
        phpClass.classPosition = position;
        jsonPhpClass.methods.forEach(method => {
            phpClass.addMethod(method);
        });
        jsonPhpClass.uses.forEach(use => {
            phpClass.uses.push(new PHPUse_1.PHPUse(use.className, use.alias));
        });
        return phpClass;
    }
}
exports.PHPClass = PHPClass;
//# sourceMappingURL=PHPClass.js.map