"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ParameterCompletionItem extends vscode.CompletionItem {
    constructor(parameter) {
        super(parameter.name, vscode.CompletionItemKind.Property);
        this.parameter = parameter;
    }
    get detail() {
        return this.parameter.name;
    }
    get documentation() {
        return "Of value : " + this.parameter.value;
    }
}
exports.ParameterCompletionItem = ParameterCompletionItem;
//# sourceMappingURL=ParameterCompletionItem.js.map