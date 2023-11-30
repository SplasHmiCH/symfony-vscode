"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ParserPHPClassProvider_1 = require("./provider/ParserPHPClassProvider");
var CachePHPClassProvider_1 = require("./provider/CachePHPClassProvider");
var PHPClassStore = /** @class */ (function () {
    function PHPClassStore(cacheManager) {
        this._phpClassProviders = [];
        this._phpClassesIndex = new Map();
        this._phpUsesIndex = new Map();
        this._cacheManager = cacheManager;
        this._phpClassProviders.push(new CachePHPClassProvider_1.CachePHPClassProvider(cacheManager));
        this._phpClassProviders.push(new ParserPHPClassProvider_1.ParserPHPClassProvider());
    }
    PHPClassStore.prototype.refreshAll = function () {
        var _this = this;
        this._phpClassesIndex.clear();
        var hasValidProvider = this._phpClassProviders.some(function (provider) {
            if (provider.canUpdateAllUris()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: PHPClassStore.PHP_CLASS_FETCH_MESSAGE }, function (progress, token) {
                    return provider.updateAllUris().then(function (phpClasses) {
                        phpClasses.forEach(function (phpClass) {
                            _this._phpClassesIndex.set(phpClass.className, phpClass);
                            if (phpClass.uses.length > 0) {
                                _this._phpUsesIndex.set(phpClass.documentUri.fsPath, phpClass.uses);
                            }
                        });
                        _this._cacheManager.set(phpClasses);
                    }).catch(function (reason) {
                        vscode.window.showErrorMessage(reason);
                    });
                });
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(PHPClassStore.PHP_CLASS_NO_PROVIDER);
        }
    };
    PHPClassStore.prototype.clearCacheAndRefreshAll = function () {
        var _this = this;
        this._cacheManager.clear().then(function () {
            _this.refreshAll();
        });
    };
    PHPClassStore.prototype.refresh = function (uri) {
        var _this = this;
        var hasValidProvider = this._phpClassProviders.some(function (provider) {
            if (provider.canUpdateUri(uri)) {
                provider.updateUri(uri).then(function (phpClasses) {
                    phpClasses.forEach(function (phpClass) {
                        _this._phpClassesIndex.set(phpClass.className, phpClass);
                        if (phpClass.uses.length > 0) {
                            _this._phpUsesIndex.set(phpClass.documentUri.fsPath, phpClass.uses);
                        }
                    });
                });
                var phpClasses = Array.from(_this._phpClassesIndex.values());
                _this._cacheManager.set(phpClasses);
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(PHPClassStore.PHP_CLASS_NO_PROVIDER);
        }
    };
    PHPClassStore.prototype.clearCacheAndRefresh = function (uri) {
        var _this = this;
        this._cacheManager.clearClassByUri(uri).then(function () {
            _this.refresh(uri);
        });
    };
    PHPClassStore.prototype.getPhpClass = function (className) {
        return this._phpClassesIndex.get(className);
    };
    PHPClassStore.prototype.getUsesForUri = function (uri) {
        return this._phpUsesIndex.get(uri.fsPath);
    };
    return PHPClassStore;
}());
PHPClassStore.PHP_CLASS_FETCH_MESSAGE = "Fetching PHP classes...";
PHPClassStore.PHP_CLASS_NO_PROVIDER = "Cannot retrieve PHP classes at the moment";
exports.PHPClassStore = PHPClassStore;
