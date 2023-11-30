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
var AbstractContainerViewProvider_1 = require("./AbstractContainerViewProvider");
var ParameterTreeItem_1 = require("./ParameterTreeItem");
var ParameterViewProvider = /** @class */ (function (_super) {
    __extends(ParameterViewProvider, _super);
    function ParameterViewProvider() {
        var _this = _super.call(this) || this;
        _this._parameters = [];
        return _this;
    }
    ParameterViewProvider.prototype.onParametersChanges = function (parameters) {
        this._parameters = parameters;
        this._onDidChangeTreeData.fire();
    };
    ParameterViewProvider.prototype.getTreeItems = function () {
        var _this = this;
        var treeItems = [];
        this._parameters.forEach(function (parameter) {
            if (_this.acceptSearchable(parameter)) {
                treeItems.push(new ParameterTreeItem_1.ParameterTreeItem(parameter));
            }
        });
        return treeItems;
    };
    ParameterViewProvider.prototype._getSearchItemContext = function () {
        return 'symfony-vscode.searchItem.parameter';
    };
    return ParameterViewProvider;
}(AbstractContainerViewProvider_1.AbstractContainerViewProvider));
exports.ParameterViewProvider = ParameterViewProvider;
