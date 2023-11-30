"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class PHPClassesController {
    constructor(phpClassStore) {
        this._phpClassStore = phpClassStore;
        vscode.commands.registerCommand('symfony-vscode.refreshPHPClasses', () => {
            this._phpClassStore.clearCacheAndRefreshAll();
        });
    }
}
exports.PHPClassesController = PHPClassesController;
//# sourceMappingURL=PHPClassesController.js.map