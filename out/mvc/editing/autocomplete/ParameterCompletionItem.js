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
var ParameterCompletionItem = /** @class */ (function (_super) {
    __extends(ParameterCompletionItem, _super);
    function ParameterCompletionItem(parameter) {
        var _this = _super.call(this, parameter.name, vscode.CompletionItemKind.Property) || this;
        _this.parameter = parameter;
        return _this;
    }
    Object.defineProperty(ParameterCompletionItem.prototype, "detail", {
        get: function () {
            return this.parameter.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterCompletionItem.prototype, "documentation", {
        get: function () {
            return "Of value : " + this.parameter.value;
        },
        enumerable: true,
        configurable: true
    });
    return ParameterCompletionItem;
}(vscode.CompletionItem));
exports.ParameterCompletionItem = ParameterCompletionItem;
