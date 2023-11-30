"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const AbstractContainerStoreListener_1 = require("../../../symfony/AbstractContainerStoreListener");
const EditingUtils_1 = require("../EditingUtils");
const ServiceDocumentationCodeAction_1 = require("./ServiceDocumentationCodeAction");
class ServiceDocumentationCodeActionProvider extends AbstractContainerStoreListener_1.AbstractContainerStoreListener {
    constructor(phpClassStore) {
        super();
        this._servicesDefinitionsList = [];
        this._phpClassStore = phpClassStore;
    }
    onServicesChanges(servicesDefinitionList) {
        this._servicesDefinitionsList = servicesDefinitionList;
    }
    provideCodeActions(document, range, context, token) {
        if (range instanceof vscode.Selection) {
            let potentialServiceRange = EditingUtils_1.EditingUtils.getWordRange(document, range.active);
            let potentialServiceName = document.getText(potentialServiceRange);
            let use = this._phpClassStore.getUsesForUri(document.uri).find(use => {
                return potentialServiceName == use.shortName;
            });
            let serviceDefinition = this._servicesDefinitionsList.find(serviceDefinition => {
                if (potentialServiceName === serviceDefinition.id) {
                    return true;
                }
                else if (potentialServiceName === serviceDefinition.className && potentialServiceName !== "") {
                    return true;
                }
                else if (use !== undefined && use.className === serviceDefinition.className) {
                    return true;
                }
                else if (use !== undefined && use.className === serviceDefinition.id) {
                    return true;
                }
                return false;
            });
            if (serviceDefinition !== undefined) {
                return [new ServiceDocumentationCodeAction_1.ServiceDocumentationCodeAction(document, potentialServiceRange, serviceDefinition)];
            }
            return null;
        }
        return null;
    }
}
exports.ServiceDocumentationCodeActionProvider = ServiceDocumentationCodeActionProvider;
//# sourceMappingURL=ServiceDocumentationCodeActionProvider.js.map