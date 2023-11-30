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
var AbstractServiceDefinitionProvider_1 = require("./AbstractServiceDefinitionProvider");
var ConfigurationFileServiceDefinitionProvider = /** @class */ (function (_super) {
    __extends(ConfigurationFileServiceDefinitionProvider, _super);
    function ConfigurationFileServiceDefinitionProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigurationFileServiceDefinitionProvider.prototype.acceptServiceDefinition = function (hoveredWord, serviceDefinition) {
        return hoveredWord === serviceDefinition.id || hoveredWord === serviceDefinition.className;
    };
    return ConfigurationFileServiceDefinitionProvider;
}(AbstractServiceDefinitionProvider_1.AbstractServiceDefinitionProvider));
exports.ConfigurationFileServiceDefinitionProvider = ConfigurationFileServiceDefinitionProvider;
