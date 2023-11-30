"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const EditingUtils_1 = require("../EditingUtils");
class AbstractServiceDefinitionProvider {
    constructor(containerStore, phpClassStore) {
        this._containerStore = containerStore;
        this._phpClassStore = phpClassStore;
    }
    provideDefinition(document, position, token) {
        let wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        let hoveredWord = document.getText(wordRange);
        let serviceDefinition = this._containerStore.serviceDefinitionList.find(service => {
            return this.acceptServiceDefinition(hoveredWord, service);
        });
        if (serviceDefinition !== undefined) {
            return this.getLocationOfService(serviceDefinition);
        }
        else {
            return null;
        }
    }
    getLocationOfService(serviceDefinition) {
        let phpClass = this._phpClassStore.getPhpClass(serviceDefinition.className);
        if (phpClass) {
            return new vscode.Location(phpClass.documentUri, phpClass.classPosition);
        }
        else {
            return null;
        }
    }
}
exports.AbstractServiceDefinitionProvider = AbstractServiceDefinitionProvider;
//# sourceMappingURL=AbstractServiceDefinitionProvider.js.map