"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
class ParameterTreeItem extends AbstractContainerTreeItem_1.AbstractContainerTreeItem {
    constructor(parameter) {
        super(parameter.name, vscode.TreeItemCollapsibleState.Collapsed);
        this._parameter = parameter;
    }
    get tooltip() {
        return this._parameter.value;
    }
    get childrenItems() {
        return [new vscode.TreeItem("Value : " + this._parameter.value, vscode.TreeItemCollapsibleState.None)];
    }
}
exports.ParameterTreeItem = ParameterTreeItem;
//# sourceMappingURL=ParameterTreeItem.js.map