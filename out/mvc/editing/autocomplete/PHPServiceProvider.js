"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHPServiceCompletionItem_1 = require("./PHPServiceCompletionItem");
class PHPServiceProvider {
    constructor(containerStore) {
        this._containerStore = containerStore;
    }
    provideCompletionItems(document, position, token, context) {
        let result = [];
        let serviceDefinitions = this._containerStore.serviceDefinitionList;
        serviceDefinitions.forEach(serviceDefinition => {
            if (serviceDefinition.public) {
                let item = new PHPServiceCompletionItem_1.PHPServiceCompletionItem(serviceDefinition);
                result.push(item);
            }
        });
        return result;
    }
}
exports.PHPServiceProvider = PHPServiceProvider;
//# sourceMappingURL=PHPServiceProvider.js.map