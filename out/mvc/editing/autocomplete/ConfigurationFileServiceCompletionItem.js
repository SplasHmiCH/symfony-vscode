"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ConfigurationFileServiceCompletionItem extends vscode.CompletionItem {
    constructor(serviceDefinition) {
        super(serviceDefinition.id, vscode.CompletionItemKind.Reference);
        this._serviceDefinition = serviceDefinition;
    }
    get detail() {
        return this._serviceDefinition.id;
    }
    get documentation() {
        return "Of class " + this._serviceDefinition.className;
    }
}
exports.ConfigurationFileServiceCompletionItem = ConfigurationFileServiceCompletionItem;
//# sourceMappingURL=ConfigurationFileServiceCompletionItem.js.map