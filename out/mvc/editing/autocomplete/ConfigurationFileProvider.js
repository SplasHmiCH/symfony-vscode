"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ConfigurationFileServiceCompletionItem_1 = require("./ConfigurationFileServiceCompletionItem");
const ParameterCompletionItem_1 = require("./ParameterCompletionItem");
const EditingUtils_1 = require("../EditingUtils");
class ConfigurationFileProvider {
    constructor(containerStore) {
        this._containerStore = containerStore;
    }
    provideCompletionItems(document, position, token, context) {
        let result = [];
        let serviceDefinitions = this._containerStore.serviceDefinitionList;
        let parameters = this._containerStore.parameterList;
        let wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        let previousCharacter = document.getText(new vscode.Range(wordRange.start.translate(0, -1), wordRange.start));
        if (previousCharacter === "@") {
            serviceDefinitions.forEach(serviceDefinition => {
                if (!serviceDefinition.isServiceIdAClassName()) {
                    let item = new ConfigurationFileServiceCompletionItem_1.ConfigurationFileServiceCompletionItem(serviceDefinition);
                    result.push(item);
                }
            });
        }
        else {
            serviceDefinitions.forEach(serviceDefinition => {
                let item = new ConfigurationFileServiceCompletionItem_1.ConfigurationFileServiceCompletionItem(serviceDefinition);
                result.push(item);
            });
            parameters.forEach(parameter => {
                let item = new ParameterCompletionItem_1.ParameterCompletionItem(parameter);
                result.push(item);
            });
        }
        return result;
    }
}
exports.ConfigurationFileProvider = ConfigurationFileProvider;
//# sourceMappingURL=ConfigurationFileProvider.js.map