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
var RouteDefinitionTreeItem_1 = require("./RouteDefinitionTreeItem");
var AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
var RouteDefinitionViewProvider = /** @class */ (function (_super) {
    __extends(RouteDefinitionViewProvider, _super);
    function RouteDefinitionViewProvider() {
        var _this = _super.call(this) || this;
        _this._routesDefinitions = [];
        _this._displayPaths = false;
        return _this;
    }
    RouteDefinitionViewProvider.prototype.onRoutesChanges = function (routesDefinitions) {
        this._routesDefinitions = routesDefinitions;
        this._onDidChangeTreeData.fire();
    };
    RouteDefinitionViewProvider.prototype.togglePathsDisplay = function () {
        this._displayPaths = !this._displayPaths;
        this._onDidChangeTreeData.fire();
    };
    RouteDefinitionViewProvider.prototype.getTreeItems = function () {
        var _this = this;
        var treeItems = [];
        this._routesDefinitions.forEach(function (routeDefinition) {
            if (_this.acceptSearchable(routeDefinition)) {
                treeItems.push(new RouteDefinitionTreeItem_1.RouteDefinitionTreeItem(routeDefinition, _this._displayPaths));
            }
        });
        return treeItems;
    };
    RouteDefinitionViewProvider.prototype._getSearchItemContext = function () {
        return 'symfony-vscode.searchItem.route';
    };
    return RouteDefinitionViewProvider;
}(AbstractContainerViewProvider_1.AbstractContainerViewProvider));
exports.RouteDefinitionViewProvider = RouteDefinitionViewProvider;
