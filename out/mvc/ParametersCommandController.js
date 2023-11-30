"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ParametersCommandController {
    constructor(containerStore, parameterViewProvider) {
        this._containerStore = containerStore;
        this._parameterViewProvider = parameterViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshParameters', () => {
            this._containerStore.clearCacheAndRefreshParameters();
        });
        vscode.commands.registerCommand('symfony-vscode.searchForParameters', () => {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"app\", \"doctrine\" ...)",
                value: this._parameterViewProvider.previousSearchCriteria
            }).then(criteria => {
                if (criteria !== undefined) {
                    this._parameterViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearParametersSearch', () => this._parameterViewProvider.clearCriteria());
    }
}
exports.ParametersCommandController = ParametersCommandController;
//# sourceMappingURL=ParametersCommandController.js.map