"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PHPServiceCompletionItem_1 = require("./PHPServiceCompletionItem");
var PHPServiceProvider = /** @class */ (function () {
    function PHPServiceProvider(containerStore) {
        this._containerStore = containerStore;
    }
    PHPServiceProvider.prototype.provideCompletionItems = function (document, position, token, context) {
        var result = [];
        var serviceDefinitions = this._containerStore.serviceDefinitionList;
        serviceDefinitions.forEach(function (serviceDefinition) {
            if (serviceDefinition.public) {
                var item = new PHPServiceCompletionItem_1.PHPServiceCompletionItem(serviceDefinition);
                result.push(item);
            }
        });
        return result;
    };
    return PHPServiceProvider;
}());
exports.PHPServiceProvider = PHPServiceProvider;
