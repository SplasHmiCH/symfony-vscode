"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
class ServiceDefinitionTreeItem extends AbstractContainerTreeItem_1.AbstractContainerTreeItem {
    constructor(serviceDefinition, displayClass = false) {
        super(displayClass ? serviceDefinition.className : serviceDefinition.id, vscode.TreeItemCollapsibleState.Collapsed);
        this.serviceDefinition = serviceDefinition;
        this._displayClass = displayClass;
    }
    get tooltip() {
        return this.serviceDefinition.className;
    }
    get childrenItems() {
        let children = [];
        if (this._displayClass) {
            children.push(new vscode.TreeItem("Id : " + this.serviceDefinition.id, vscode.TreeItemCollapsibleState.None));
        }
        if (this.serviceDefinition.alias !== null) {
            children.push(new vscode.TreeItem("Alias : " + this.serviceDefinition.alias, vscode.TreeItemCollapsibleState.None));
        }
        if (!this._displayClass) {
            children.push(new vscode.TreeItem("Class : " + this.serviceDefinition.className, vscode.TreeItemCollapsibleState.None));
        }
        children.push(new vscode.TreeItem("Is public : " + (this.serviceDefinition.public ? "true" : "false"), vscode.TreeItemCollapsibleState.None));
        return children;
    }
    get contextValue() {
        return 'symfony-vscode.service';
    }
}
exports.ServiceDefinitionTreeItem = ServiceDefinitionTreeItem;
//# sourceMappingURL=ServiceDefinitionTreeItem.js.map