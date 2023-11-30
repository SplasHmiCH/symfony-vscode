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
var ServiceDefinitionTreeItem_1 = require("./ServiceDefinitionTreeItem");
var AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
var ServiceDefintionViewProvider = /** @class */ (function (_super) {
    __extends(ServiceDefintionViewProvider, _super);
    function ServiceDefintionViewProvider() {
        var _this = _super.call(this) || this;
        _this._servicesDefinitions = [];
        _this._displayClasses = false;
        return _this;
    }
    ServiceDefintionViewProvider.prototype.onServicesChanges = function (servicesDefinitions) {
        this._servicesDefinitions = servicesDefinitions;
        this._onDidChangeTreeData.fire();
    };
    ServiceDefintionViewProvider.prototype.toggleClassDisplay = function () {
        this._displayClasses = !this._displayClasses;
        this._onDidChangeTreeData.fire();
    };
    ServiceDefintionViewProvider.prototype.getTreeItems = function () {
        var _this = this;
        var treeItems = [];
        this._servicesDefinitions.forEach(function (serviceDefinition) {
            if (_this.acceptSearchable(serviceDefinition)) {
                treeItems.push(new ServiceDefinitionTreeItem_1.ServiceDefinitionTreeItem(serviceDefinition, _this._displayClasses));
            }
        });
        return treeItems;
    };
    ServiceDefintionViewProvider.prototype._getSearchItemContext = function () {
        return 'symfony-vscode.searchItem.service';
    };
    return ServiceDefintionViewProvider;
}(AbstractContainerViewProvider_1.AbstractContainerViewProvider));
exports.ServiceDefintionViewProvider = ServiceDefintionViewProvider;
