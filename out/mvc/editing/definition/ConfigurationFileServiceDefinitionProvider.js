"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractServiceDefinitionProvider_1 = require("./AbstractServiceDefinitionProvider");
class ConfigurationFileServiceDefinitionProvider extends AbstractServiceDefinitionProvider_1.AbstractServiceDefinitionProvider {
    acceptServiceDefinition(hoveredWord, serviceDefinition) {
        return hoveredWord === serviceDefinition.id || hoveredWord === serviceDefinition.className;
    }
}
exports.ConfigurationFileServiceDefinitionProvider = ConfigurationFileServiceDefinitionProvider;
//# sourceMappingURL=ConfigurationFileServiceDefinitionProvider.js.map