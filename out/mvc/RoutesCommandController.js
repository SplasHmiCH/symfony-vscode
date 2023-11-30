"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class RoutesCommandController {
    constructor(containerStore, routeDefintionViewProvider) {
        this._containerStore = containerStore;
        this._routeDefinitionViewProvider = routeDefintionViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshRouteDefinitions', () => {
            this._containerStore.clearCacheAndRefreshRoutes();
        });
        vscode.commands.registerCommand('symfony-vscode.togglePathDisplay', () => this._routeDefinitionViewProvider.togglePathsDisplay());
        vscode.commands.registerCommand('symfony-vscode.searchForRoutes', () => {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"AppBundle\", \"product\" ...)",
                value: this._routeDefinitionViewProvider.previousSearchCriteria
            }).then(criteria => {
                if (criteria !== undefined) {
                    this._routeDefinitionViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearRoutesSearch', () => this._routeDefinitionViewProvider.clearCriteria());
    }
}
exports.RoutesCommandController = RoutesCommandController;
//# sourceMappingURL=RoutesCommandController.js.map