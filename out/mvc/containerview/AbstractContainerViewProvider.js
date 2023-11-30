"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AbstractContainerStoreListener_1 = require("../../symfony/AbstractContainerStoreListener");
const AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
class AbstractContainerViewProvider extends AbstractContainerStoreListener_1.AbstractContainerStoreListener {
    constructor() {
        super(...arguments);
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this._searchCriteria = false;
        this._previousSearchCriteria = null;
    }
    setCriteria(criteria) {
        this._searchCriteria = criteria;
        if (criteria) {
            this._previousSearchCriteria = criteria;
        }
        this._onDidChangeTreeData.fire();
    }
    clearCriteria() {
        this.setCriteria(false);
    }
    acceptSearchable(searchable) {
        return (false === this._searchCriteria || searchable.acceptSearchCriteria(this._searchCriteria.toString()) > 0);
    }
    getTreeItem(element) {
        return element;
    }
    _getSearchItemContext() {
        return null;
    }
    getChildren(element) {
        return new Promise(resolve => {
            if (!element) {
                let result = [];
                let containerTreeItems = this.getTreeItems();
                containerTreeItems.sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    if (a.label > b.label) {
                        return 1;
                    }
                    return 0;
                });
                if (false !== this._searchCriteria) {
                    let searchTreeItem = new vscode.TreeItem("Searching for : " + this._searchCriteria);
                    if (this._getSearchItemContext()) {
                        searchTreeItem.contextValue = this._getSearchItemContext();
                    }
                    result.push(searchTreeItem);
                }
                resolve(result.concat(containerTreeItems));
            }
            else {
                if (element instanceof AbstractContainerTreeItem_1.AbstractContainerTreeItem) {
                    resolve(element.childrenItems);
                }
                else {
                    resolve([]);
                }
            }
        });
    }
    get previousSearchCriteria() {
        return this._previousSearchCriteria;
    }
}
exports.AbstractContainerViewProvider = AbstractContainerViewProvider;
//# sourceMappingURL=AbstractContainerViewProvider.js.map