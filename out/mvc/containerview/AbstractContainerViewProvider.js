"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var AbstractContainerStoreListener_1 = require("../../symfony/AbstractContainerStoreListener");
var AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
var AbstractContainerViewProvider = /** @class */ (function (_super) {
    __extends(AbstractContainerViewProvider, _super);
    function AbstractContainerViewProvider() {
        var _this = _super.apply(this, arguments) || this;
        _this._onDidChangeTreeData = new vscode.EventEmitter();
        _this.onDidChangeTreeData = _this._onDidChangeTreeData.event;
        _this._searchCriteria = false;
        _this._previousSearchCriteria = null;
        return _this;
    }
    AbstractContainerViewProvider.prototype.setCriteria = function (criteria) {
        this._searchCriteria = criteria;
        if (criteria) {
            this._previousSearchCriteria = criteria;
        }
        this._onDidChangeTreeData.fire();
    };
    AbstractContainerViewProvider.prototype.clearCriteria = function () {
        this.setCriteria(false);
    };
    AbstractContainerViewProvider.prototype.acceptSearchable = function (searchable) {
        return (false === this._searchCriteria || searchable.acceptSearchCriteria(this._searchCriteria.toString()) > 0);
    };
    AbstractContainerViewProvider.prototype.getTreeItem = function (element) {
        return element;
    };
    AbstractContainerViewProvider.prototype._getSearchItemContext = function () {
        return null;
    };
    AbstractContainerViewProvider.prototype.getChildren = function (element) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!element) {
                var result = [];
                var containerTreeItems = _this.getTreeItems();
                containerTreeItems.sort(function (a, b) {
                    if (a.label < b.label) {
                        return -1;
                    }
                    if (a.label > b.label) {
                        return 1;
                    }
                    return 0;
                });
                if (false !== _this._searchCriteria) {
                    var searchTreeItem = new vscode.TreeItem("Searching for : " + _this._searchCriteria);
                    if (_this._getSearchItemContext()) {
                        searchTreeItem.contextValue = _this._getSearchItemContext();
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
    };
    Object.defineProperty(AbstractContainerViewProvider.prototype, "previousSearchCriteria", {
        get: function () {
            return this._previousSearchCriteria;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractContainerViewProvider;
}(AbstractContainerStoreListener_1.AbstractContainerStoreListener));
exports.AbstractContainerViewProvider = AbstractContainerViewProvider;
