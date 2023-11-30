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
var ParameterTreeItem = /** @class */ (function (_super) {
    __extends(ParameterTreeItem, _super);
    function ParameterTreeItem(parameter) {
        var _this = _super.call(this, parameter.name, vscode.TreeItemCollapsibleState.Collapsed) || this;
        _this._parameter = parameter;
        return _this;
    }
    Object.defineProperty(ParameterTreeItem.prototype, "tooltip", {
        get: function () {
            return this._parameter.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTreeItem.prototype, "childrenItems", {
        get: function () {
            return [new vscode.TreeItem("Value : " + this._parameter.value, vscode.TreeItemCollapsibleState.None)];
        },
        enumerable: true,
        configurable: true
    });
    return ParameterTreeItem;
}(AbstractContainerTreeItem_1.AbstractContainerTreeItem));
exports.ParameterTreeItem = ParameterTreeItem;
