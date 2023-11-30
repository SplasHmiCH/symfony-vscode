"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractServiceDefinitionProvider_1 = require("./AbstractServiceDefinitionProvider");
class PHPServiceDefinitionProvider extends AbstractServiceDefinitionProvider_1.AbstractServiceDefinitionProvider {
    acceptServiceDefinition(hoveredWord, serviceDefinition) {
        if (serviceDefinition.isServiceIdAClassName()) {
            return false;
        }
        else {
            return hoveredWord === serviceDefinition.id;
        }
    }
}
exports.PHPServiceDefinitionProvider = PHPServiceDefinitionProvider;
//# sourceMappingURL=PHPServiceDefinitionProvider.js.map