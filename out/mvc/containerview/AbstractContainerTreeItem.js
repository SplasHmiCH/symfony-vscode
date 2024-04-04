"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractContainerTreeItem = void 0;
const vscode = require("vscode");
class AbstractContainerTreeItem extends vscode.TreeItem {
    constructor(label, state) {
        super(label, state);
    }
}
exports.AbstractContainerTreeItem = AbstractContainerTreeItem;
//# sourceMappingURL=AbstractContainerTreeItem.js.map