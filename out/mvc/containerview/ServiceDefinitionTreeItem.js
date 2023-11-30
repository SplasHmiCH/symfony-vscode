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
var ServiceDefinitionTreeItem = /** @class */ (function (_super) {
    __extends(ServiceDefinitionTreeItem, _super);
    function ServiceDefinitionTreeItem(serviceDefinition, displayClass) {
        if (displayClass === void 0) { displayClass = false; }
        var _this = _super.call(this, displayClass ? serviceDefinition.className : serviceDefinition.id, vscode.TreeItemCollapsibleState.Collapsed) || this;
        _this.serviceDefinition = serviceDefinition;
        _this._displayClass = displayClass;
        return _this;
    }
    Object.defineProperty(ServiceDefinitionTreeItem.prototype, "tooltip", {
        get: function () {
            return this.serviceDefinition.className;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceDefinitionTreeItem.prototype, "childrenItems", {
        get: function () {
            var children = [];
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceDefinitionTreeItem.prototype, "contextValue", {
        get: function () {
            return 'symfony-vscode.service';
        },
        enumerable: true,
        configurable: true
    });
    return ServiceDefinitionTreeItem;
}(AbstractContainerTreeItem_1.AbstractContainerTreeItem));
exports.ServiceDefinitionTreeItem = ServiceDefinitionTreeItem;
