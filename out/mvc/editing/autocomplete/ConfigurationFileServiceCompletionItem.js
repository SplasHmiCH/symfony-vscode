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
var ConfigurationFileServiceCompletionItem = /** @class */ (function (_super) {
    __extends(ConfigurationFileServiceCompletionItem, _super);
    function ConfigurationFileServiceCompletionItem(serviceDefinition) {
        var _this = _super.call(this, serviceDefinition.id, vscode.CompletionItemKind.Reference) || this;
        _this._serviceDefinition = serviceDefinition;
        return _this;
    }
    Object.defineProperty(ConfigurationFileServiceCompletionItem.prototype, "detail", {
        get: function () {
            return this._serviceDefinition.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationFileServiceCompletionItem.prototype, "documentation", {
        get: function () {
            return "Of class " + this._serviceDefinition.className;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigurationFileServiceCompletionItem;
}(vscode.CompletionItem));
exports.ConfigurationFileServiceCompletionItem = ConfigurationFileServiceCompletionItem;
