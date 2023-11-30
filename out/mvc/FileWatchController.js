"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var FileWatchController = /** @class */ (function () {
    function FileWatchController(containerStore, phpClassStore) {
        var _a;
        var _this = this;
        this._configuration = vscode.workspace.getConfiguration("symfony-vscode");
        this._containerStore = containerStore;
        this._phpClassStore = phpClassStore;
        var fileNameRegExp = this._getFileNameRegExp();
        var subscriptions = [];
        vscode.workspace.onDidSaveTextDocument(function (e) {
            if (e.fileName.match(fileNameRegExp)) {
                _this._containerStore.clearCacheAndRefreshAll();
            }
            if (e.fileName.match(/\.php$/)) {
                _this._phpClassStore.clearCacheAndRefresh(e.uri);
            }
        }, this, subscriptions);
        this._disposable = (_a = vscode.Disposable).from.apply(_a, subscriptions);
    }
    FileWatchController.prototype._getFileNameRegExp = function () {
        var extensions = this._configuration.get('fileWatchingPatterns');
        extensions = extensions.map(function (ext) {
            return '.' + ext;
        });
        return new RegExp("(" + extensions.join('|') + ")$");
    };
    FileWatchController.prototype.dispose = function () {
        this._disposable.dispose();
    };
    return FileWatchController;
}());
exports.FileWatchController = FileWatchController;
