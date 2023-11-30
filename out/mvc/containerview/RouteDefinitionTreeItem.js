"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
class RouteDefinitionTreeItem extends AbstractContainerTreeItem_1.AbstractContainerTreeItem {
    constructor(routeDefinition, displayPath = false) {
        super(displayPath ? routeDefinition.path + " [" + routeDefinition.method + "]" : routeDefinition.id, vscode.TreeItemCollapsibleState.Collapsed);
        this._routeDefinition = routeDefinition;
        this._displayPath = displayPath;
    }
    get tooltip() {
        return this._routeDefinition.path + " [" + this._routeDefinition.method + "]";
    }
    get childrenItems() {
        let children = [];
        if (this._displayPath) {
            children.push(new vscode.TreeItem("Id : " + this._routeDefinition.id, vscode.TreeItemCollapsibleState.None));
        }
        else {
            children.push(new vscode.TreeItem("Path : " + this._routeDefinition.path, vscode.TreeItemCollapsibleState.None));
        }
        children.push(new vscode.TreeItem("Method : " + this._routeDefinition.method, vscode.TreeItemCollapsibleState.None));
        children.push(new vscode.TreeItem("Action : " + this._routeDefinition.action, vscode.TreeItemCollapsibleState.None));
        return children;
    }
}
exports.RouteDefinitionTreeItem = RouteDefinitionTreeItem;
//# sourceMappingURL=RouteDefinitionTreeItem.js.map