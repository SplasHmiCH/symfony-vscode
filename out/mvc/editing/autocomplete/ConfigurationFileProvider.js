"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ConfigurationFileServiceCompletionItem_1 = require("./ConfigurationFileServiceCompletionItem");
var ParameterCompletionItem_1 = require("./ParameterCompletionItem");
var EditingUtils_1 = require("../EditingUtils");
var ConfigurationFileProvider = /** @class */ (function () {
    function ConfigurationFileProvider(containerStore) {
        this._containerStore = containerStore;
    }
    ConfigurationFileProvider.prototype.provideCompletionItems = function (document, position, token, context) {
        var result = [];
        var serviceDefinitions = this._containerStore.serviceDefinitionList;
        var parameters = this._containerStore.parameterList;
        var wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        var previousCharacter = document.getText(new vscode.Range(wordRange.start.translate(0, -1), wordRange.start));
        if (previousCharacter === "@") {
            serviceDefinitions.forEach(function (serviceDefinition) {
                if (!serviceDefinition.isServiceIdAClassName()) {
                    var item = new ConfigurationFileServiceCompletionItem_1.ConfigurationFileServiceCompletionItem(serviceDefinition);
                    result.push(item);
                }
            });
        }
        else {
            serviceDefinitions.forEach(function (serviceDefinition) {
                var item = new ConfigurationFileServiceCompletionItem_1.ConfigurationFileServiceCompletionItem(serviceDefinition);
                result.push(item);
            });
            parameters.forEach(function (parameter) {
                var item = new ParameterCompletionItem_1.ParameterCompletionItem(parameter);
                result.push(item);
            });
        }
        return result;
    };
    return ConfigurationFileProvider;
}());
exports.ConfigurationFileProvider = ConfigurationFileProvider;
