"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const EditingUtils_1 = require("../EditingUtils");
class ContainerHoverProvider {
    constructor(containerStore) {
        this._containerStore = containerStore;
    }
    provideHover(document, position, token) {
        let wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        let hoveredWord = document.getText(wordRange);
        let serviceDefinition = this._containerStore.serviceDefinitionList.find(serviceDefinition => {
            return hoveredWord === serviceDefinition.id;
        });
        if (serviceDefinition !== undefined) {
            return new vscode.Hover(serviceDefinition.className, wordRange);
        }
        else {
            let parameterDefinition = this._containerStore.parameterList.find(parameterDefinition => {
                return hoveredWord === parameterDefinition.name;
            });
            if (parameterDefinition !== undefined) {
                return new vscode.Hover("Value : " + parameterDefinition.value, wordRange);
            }
            else {
                return null;
            }
        }
    }
}
exports.ContainerHoverProvider = ContainerHoverProvider;
//# sourceMappingURL=ContainerHoverProvider.js.map