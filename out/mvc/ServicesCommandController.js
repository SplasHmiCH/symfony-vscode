"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ServicesCommandController {
    constructor(containerStore, serviceDefinitionViewProvider) {
        this._containerStore = containerStore;
        this._serviceDefinitionViewProvider = serviceDefinitionViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshServiceDefinitions', () => {
            this._containerStore.clearCacheAndRefreshServices();
        });
        vscode.commands.registerCommand('symfony-vscode.toggleClassDisplay', () => this._serviceDefinitionViewProvider.toggleClassDisplay());
        vscode.commands.registerCommand('symfony-vscode.searchForServices', () => {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"AppBundle\", \"acme.helper\" ...)",
                value: this._serviceDefinitionViewProvider.previousSearchCriteria
            }).then(criteria => {
                if (criteria !== undefined) {
                    this._serviceDefinitionViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearServicesSearch', () => this._serviceDefinitionViewProvider.clearCriteria());
    }
}
exports.ServicesCommandController = ServicesCommandController;
//# sourceMappingURL=ServicesCommandController.js.map