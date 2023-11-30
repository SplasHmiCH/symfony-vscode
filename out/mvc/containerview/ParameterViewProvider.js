"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
const ParameterTreeItem_1 = require("./ParameterTreeItem");
class ParameterViewProvider extends AbstractContainerViewProvider_1.AbstractContainerViewProvider {
    constructor() {
        super();
        this._parameters = [];
    }
    onParametersChanges(parameters) {
        this._parameters = parameters;
        this._onDidChangeTreeData.fire();
    }
    getTreeItems() {
        let treeItems = [];
        this._parameters.forEach(parameter => {
            if (this.acceptSearchable(parameter)) {
                treeItems.push(new ParameterTreeItem_1.ParameterTreeItem(parameter));
            }
        });
        return treeItems;
    }
    _getSearchItemContext() {
        return 'symfony-vscode.searchItem.parameter';
    }
}
exports.ParameterViewProvider = ParameterViewProvider;
//# sourceMappingURL=ParameterViewProvider.js.map