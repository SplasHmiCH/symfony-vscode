"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ServicesCommandController = /** @class */ (function () {
    function ServicesCommandController(containerStore, serviceDefinitionViewProvider) {
        var _this = this;
        this._containerStore = containerStore;
        this._serviceDefinitionViewProvider = serviceDefinitionViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshServiceDefinitions', function () {
            _this._containerStore.clearCacheAndRefreshServices();
        });
        vscode.commands.registerCommand('symfony-vscode.toggleClassDisplay', function () { return _this._serviceDefinitionViewProvider.toggleClassDisplay(); });
        vscode.commands.registerCommand('symfony-vscode.searchForServices', function () {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"AppBundle\", \"acme.helper\" ...)",
                value: _this._serviceDefinitionViewProvider.previousSearchCriteria
            }).then(function (criteria) {
                if (criteria !== undefined) {
                    _this._serviceDefinitionViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearServicesSearch', function () { return _this._serviceDefinitionViewProvider.clearCriteria(); });
    }
    return ServicesCommandController;
}());
exports.ServicesCommandController = ServicesCommandController;
