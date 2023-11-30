"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouteDefinitionTreeItem_1 = require("./RouteDefinitionTreeItem");
const AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
class RouteDefinitionViewProvider extends AbstractContainerViewProvider_1.AbstractContainerViewProvider {
    constructor() {
        super();
        this._routesDefinitions = [];
        this._displayPaths = false;
    }
    onRoutesChanges(routesDefinitions) {
        this._routesDefinitions = routesDefinitions;
        this._onDidChangeTreeData.fire();
    }
    togglePathsDisplay() {
        this._displayPaths = !this._displayPaths;
        this._onDidChangeTreeData.fire();
    }
    getTreeItems() {
        let treeItems = [];
        this._routesDefinitions.forEach(routeDefinition => {
            if (this.acceptSearchable(routeDefinition)) {
                treeItems.push(new RouteDefinitionTreeItem_1.RouteDefinitionTreeItem(routeDefinition, this._displayPaths));
            }
        });
        return treeItems;
    }
    _getSearchItemContext() {
        return 'symfony-vscode.searchItem.route';
    }
}
exports.RouteDefinitionViewProvider = RouteDefinitionViewProvider;
//# sourceMappingURL=RouteDefinitionViewProvider.js.map