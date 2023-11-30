"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var RoutesCommandController = /** @class */ (function () {
    function RoutesCommandController(containerStore, routeDefintionViewProvider) {
        var _this = this;
        this._containerStore = containerStore;
        this._routeDefinitionViewProvider = routeDefintionViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshRouteDefinitions', function () {
            _this._containerStore.clearCacheAndRefreshRoutes();
        });
        vscode.commands.registerCommand('symfony-vscode.togglePathDisplay', function () { return _this._routeDefinitionViewProvider.togglePathsDisplay(); });
        vscode.commands.registerCommand('symfony-vscode.searchForRoutes', function () {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"AppBundle\", \"product\" ...)",
                value: _this._routeDefinitionViewProvider.previousSearchCriteria
            }).then(function (criteria) {
                if (criteria !== undefined) {
                    _this._routeDefinitionViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearRoutesSearch', function () { return _this._routeDefinitionViewProvider.clearCriteria(); });
    }
    return RoutesCommandController;
}());
exports.RoutesCommandController = RoutesCommandController;
