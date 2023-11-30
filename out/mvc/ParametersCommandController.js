"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ParametersCommandController = /** @class */ (function () {
    function ParametersCommandController(containerStore, parameterViewProvider) {
        var _this = this;
        this._containerStore = containerStore;
        this._parameterViewProvider = parameterViewProvider;
        vscode.commands.registerCommand('symfony-vscode.refreshParameters', function () {
            _this._containerStore.clearCacheAndRefreshParameters();
        });
        vscode.commands.registerCommand('symfony-vscode.searchForParameters', function () {
            vscode.window.showInputBox({
                prompt: "Criteria (e.g. \"app\", \"doctrine\" ...)",
                value: _this._parameterViewProvider.previousSearchCriteria
            }).then(function (criteria) {
                if (criteria !== undefined) {
                    _this._parameterViewProvider.setCriteria(criteria);
                }
            });
        });
        vscode.commands.registerCommand('symfony-vscode.clearParametersSearch', function () { return _this._parameterViewProvider.clearCriteria(); });
    }
    return ParametersCommandController;
}());
exports.ParametersCommandController = ParametersCommandController;
