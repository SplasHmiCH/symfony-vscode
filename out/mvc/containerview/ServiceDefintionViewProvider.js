"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceDefinitionTreeItem_1 = require("./ServiceDefinitionTreeItem");
const AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
class ServiceDefintionViewProvider extends AbstractContainerViewProvider_1.AbstractContainerViewProvider {
    constructor() {
        super();
        this._servicesDefinitions = [];
        this._displayClasses = false;
    }
    onServicesChanges(servicesDefinitions) {
        this._servicesDefinitions = servicesDefinitions;
        this._onDidChangeTreeData.fire();
    }
    toggleClassDisplay() {
        this._displayClasses = !this._displayClasses;
        this._onDidChangeTreeData.fire();
    }
    getTreeItems() {
        let treeItems = [];
        this._servicesDefinitions.forEach(serviceDefinition => {
            if (this.acceptSearchable(serviceDefinition)) {
                treeItems.push(new ServiceDefinitionTreeItem_1.ServiceDefinitionTreeItem(serviceDefinition, this._displayClasses));
            }
        });
        return treeItems;
    }
    _getSearchItemContext() {
        return 'symfony-vscode.searchItem.service';
    }
}
exports.ServiceDefintionViewProvider = ServiceDefintionViewProvider;
//# sourceMappingURL=ServiceDefintionViewProvider.js.map