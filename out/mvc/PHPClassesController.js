"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var PHPClassesController = /** @class */ (function () {
    function PHPClassesController(phpClassStore) {
        var _this = this;
        this._phpClassStore = phpClassStore;
        vscode.commands.registerCommand('symfony-vscode.refreshPHPClasses', function () {
            _this._phpClassStore.clearCacheAndRefreshAll();
        });
    }
    return PHPClassesController;
}());
exports.PHPClassesController = PHPClassesController;
