"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class FileWatchController {
    constructor(containerStore, phpClassStore) {
        this._configuration = vscode.workspace.getConfiguration("symfony-vscode");
        this._containerStore = containerStore;
        this._phpClassStore = phpClassStore;
        let fileNameRegExp = this._getFileNameRegExp();
        let subscriptions = [];
        vscode.workspace.onDidSaveTextDocument(e => {
            if (e.fileName.match(fileNameRegExp)) {
                this._containerStore.clearCacheAndRefreshAll();
            }
            if (e.fileName.match(/\.php$/)) {
                this._phpClassStore.clearCacheAndRefresh(e.uri);
            }
        }, this, subscriptions);
        this._disposable = vscode.Disposable.from(...subscriptions);
    }
    _getFileNameRegExp() {
        let extensions = this._configuration.get('fileWatchingPatterns');
        extensions = extensions.map((ext) => {
            return '.' + ext;
        });
        return new RegExp("(" + extensions.join('|') + ")$");
    }
    dispose() {
        this._disposable.dispose();
    }
}
exports.FileWatchController = FileWatchController;
//# sourceMappingURL=FileWatchController.js.map