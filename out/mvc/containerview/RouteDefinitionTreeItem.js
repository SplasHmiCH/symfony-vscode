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
var AbstractContainerTreeItem_1 = require("./AbstractContainerTreeItem");
var RouteDefinitionTreeItem = /** @class */ (function (_super) {
    __extends(RouteDefinitionTreeItem, _super);
    function RouteDefinitionTreeItem(routeDefinition, displayPath) {
        if (displayPath === void 0) { displayPath = false; }
        var _this = _super.call(this, displayPath ? routeDefinition.path + " [" + routeDefinition.method + "]" : routeDefinition.id, vscode.TreeItemCollapsibleState.Collapsed) || this;
        _this._routeDefinition = routeDefinition;
        _this._displayPath = displayPath;
        return _this;
    }
    Object.defineProperty(RouteDefinitionTreeItem.prototype, "tooltip", {
        get: function () {
            return this._routeDefinition.path + " [" + this._routeDefinition.method + "]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouteDefinitionTreeItem.prototype, "childrenItems", {
        get: function () {
            var children = [];
            if (this._displayPath) {
                children.push(new vscode.TreeItem("Id : " + this._routeDefinition.id, vscode.TreeItemCollapsibleState.None));
            }
            else {
                children.push(new vscode.TreeItem("Path : " + this._routeDefinition.path, vscode.TreeItemCollapsibleState.None));
            }
            children.push(new vscode.TreeItem("Method : " + this._routeDefinition.method, vscode.TreeItemCollapsibleState.None));
            children.push(new vscode.TreeItem("Action : " + this._routeDefinition.action, vscode.TreeItemCollapsibleState.None));
            return children;
        },
        enumerable: true,
        configurable: true
    });
    return RouteDefinitionTreeItem;
}(AbstractContainerTreeItem_1.AbstractContainerTreeItem));
exports.RouteDefinitionTreeItem = RouteDefinitionTreeItem;
