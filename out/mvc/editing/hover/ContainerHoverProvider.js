"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var EditingUtils_1 = require("../EditingUtils");
var ContainerHoverProvider = /** @class */ (function () {
    function ContainerHoverProvider(containerStore) {
        this._containerStore = containerStore;
    }
    ContainerHoverProvider.prototype.provideHover = function (document, position, token) {
        var wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        var hoveredWord = document.getText(wordRange);
        var serviceDefinition = this._containerStore.serviceDefinitionList.find(function (serviceDefinition) {
            return hoveredWord === serviceDefinition.id;
        });
        if (serviceDefinition !== undefined) {
            return new vscode.Hover(serviceDefinition.className, wordRange);
        }
        else {
            var parameterDefinition = this._containerStore.parameterList.find(function (parameterDefinition) {
                return hoveredWord === parameterDefinition.name;
            });
            if (parameterDefinition !== undefined) {
                return new vscode.Hover("Value : " + parameterDefinition.value, wordRange);
            }
            else {
                return null;
            }
        }
    };
    return ContainerHoverProvider;
}());
exports.ContainerHoverProvider = ContainerHoverProvider;
