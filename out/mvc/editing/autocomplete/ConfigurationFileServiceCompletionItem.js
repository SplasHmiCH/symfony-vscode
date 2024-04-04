"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationFileServiceCompletionItem = void 0;
const vscode = require("vscode");
class ConfigurationFileServiceCompletionItem extends vscode.CompletionItem {
    constructor(serviceDefinition) {
        super(serviceDefinition.id, vscode.CompletionItemKind.Reference);
        this._serviceDefinition = serviceDefinition;
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
exports.ConfigurationFileServiceCompletionItem = ConfigurationFileServiceCompletionItem;
//# sourceMappingURL=ConfigurationFileServiceCompletionItem.js.map