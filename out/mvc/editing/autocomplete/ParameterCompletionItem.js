"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterCompletionItem = void 0;
const vscode = require("vscode");
class ParameterCompletionItem extends vscode.CompletionItem {
    constructor(parameter) {
        super(parameter.name, vscode.CompletionItemKind.Property);
        this.parameter = parameter;
    }
    // @ts-ignore
    get detail() {
        return this.parameter.name;
    }
    // @ts-ignore
    get documentation() {
        return "Of value : " + this.parameter.value;
    }
}
exports.ParameterCompletionItem = ParameterCompletionItem;
//# sourceMappingURL=ParameterCompletionItem.js.map