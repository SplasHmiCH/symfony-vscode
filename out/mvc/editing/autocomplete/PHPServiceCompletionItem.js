"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHPServiceCompletionItem = void 0;
const vscode = require("vscode");
class PHPServiceCompletionItem extends vscode.CompletionItem {
    constructor(serviceDefinition) {
        super(serviceDefinition.id, vscode.CompletionItemKind.Reference);
        this._serviceDefinition = serviceDefinition;
    }
    // @ts-ignore
    get insertText() {
        if (!this._serviceDefinition.isServiceIdAClassName()) {
            return this._serviceDefinition.id;
        }
        else {
            return this._serviceDefinition.className + "::class";
        }
    }
    // @ts-ignore
    get detail() {
        return this._serviceDefinition.id;
    }
    // @ts-ignore
    get documentation() {
        return "Of class " + this._serviceDefinition.className;
    }
}
exports.PHPServiceCompletionItem = PHPServiceCompletionItem;
//# sourceMappingURL=PHPServiceCompletionItem.js.map