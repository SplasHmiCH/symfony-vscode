"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var EditingUtils_1 = require("../EditingUtils");
var AbstractServiceDefinitionProvider = /** @class */ (function () {
    function AbstractServiceDefinitionProvider(containerStore, phpClassStore) {
        this._containerStore = containerStore;
        this._phpClassStore = phpClassStore;
    }
    AbstractServiceDefinitionProvider.prototype.provideDefinition = function (document, position, token) {
        var _this = this;
        var wordRange = EditingUtils_1.EditingUtils.getWordRange(document, position);
        var hoveredWord = document.getText(wordRange);
        var serviceDefinition = this._containerStore.serviceDefinitionList.find(function (service) {
            return _this.acceptServiceDefinition(hoveredWord, service);
        });
        if (serviceDefinition !== undefined) {
            return this.getLocationOfService(serviceDefinition);
        }
        else {
            return null;
        }
    };
    AbstractServiceDefinitionProvider.prototype.getLocationOfService = function (serviceDefinition) {
        var phpClass = this._phpClassStore.getPhpClass(serviceDefinition.className);
        if (phpClass) {
            return new vscode.Location(phpClass.documentUri, phpClass.classPosition);
        }
        else {
            return null;
        }
    };
    return AbstractServiceDefinitionProvider;
}());
exports.AbstractServiceDefinitionProvider = AbstractServiceDefinitionProvider;
