"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var AbstractContainerStoreListener_1 = require("../../../symfony/AbstractContainerStoreListener");
var EditingUtils_1 = require("../EditingUtils");
var ServiceDocumentationCodeAction_1 = require("./ServiceDocumentationCodeAction");
var ServiceDocumentationCodeActionProvider = /** @class */ (function (_super) {
    __extends(ServiceDocumentationCodeActionProvider, _super);
    function ServiceDocumentationCodeActionProvider(phpClassStore) {
        var _this = _super.call(this) || this;
        _this._servicesDefinitionsList = [];
        _this._phpClassStore = phpClassStore;
        return _this;
    }
    ServiceDocumentationCodeActionProvider.prototype.onServicesChanges = function (servicesDefinitionList) {
        this._servicesDefinitionsList = servicesDefinitionList;
    };
    ServiceDocumentationCodeActionProvider.prototype.provideCodeActions = function (document, range, context, token) {
        if (range instanceof vscode.Selection) {
            var potentialServiceRange = EditingUtils_1.EditingUtils.getWordRange(document, range.active);
            var potentialServiceName_1 = document.getText(potentialServiceRange);
            var use_1 = this._phpClassStore.getUsesForUri(document.uri).find(function (use) {
                return potentialServiceName_1 == use.shortName;
            });
            var serviceDefinition = this._servicesDefinitionsList.find(function (serviceDefinition) {
                if (potentialServiceName_1 === serviceDefinition.id) {
                    return true;
                }
                else if (potentialServiceName_1 === serviceDefinition.className && potentialServiceName_1 !== "") {
                    return true;
                }
                else if (use_1 !== undefined && use_1.className === serviceDefinition.className) {
                    return true;
                }
                else if (use_1 !== undefined && use_1.className === serviceDefinition.id) {
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
    };
    return ServiceDocumentationCodeActionProvider;
}(AbstractContainerStoreListener_1.AbstractContainerStoreListener));
exports.ServiceDocumentationCodeActionProvider = ServiceDocumentationCodeActionProvider;
