"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ParserPHPClassProvider_1 = require("./provider/ParserPHPClassProvider");
const CachePHPClassProvider_1 = require("./provider/CachePHPClassProvider");
class PHPClassStore {
    constructor(cacheManager) {
        this._phpClassProviders = [];
        this._phpClassesIndex = new Map();
        this._phpUsesIndex = new Map();
        this._cacheManager = cacheManager;
        this._phpClassProviders.push(new CachePHPClassProvider_1.CachePHPClassProvider(cacheManager));
        this._phpClassProviders.push(new ParserPHPClassProvider_1.ParserPHPClassProvider());
    }
    refreshAll() {
        this._phpClassesIndex.clear();
        let hasValidProvider = this._phpClassProviders.some(provider => {
            if (provider.canUpdateAllUris()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: PHPClassStore.PHP_CLASS_FETCH_MESSAGE }, (progress, token) => {
                    return provider.updateAllUris().then(phpClasses => {
                        phpClasses.forEach(phpClass => {
                            this._phpClassesIndex.set(phpClass.className, phpClass);
                            if (phpClass.uses.length > 0) {
                                this._phpUsesIndex.set(phpClass.documentUri.fsPath, phpClass.uses);
                            }
                        });
                        this._cacheManager.set(phpClasses);
                    }).catch(reason => {
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
    }
    clearCacheAndRefreshAll() {
        this._cacheManager.clear().then(() => {
            this.refreshAll();
        });
    }
    refresh(uri) {
        let hasValidProvider = this._phpClassProviders.some(provider => {
            if (provider.canUpdateUri(uri)) {
                provider.updateUri(uri).then(phpClasses => {
                    phpClasses.forEach(phpClass => {
                        this._phpClassesIndex.set(phpClass.className, phpClass);
                        if (phpClass.uses.length > 0) {
                            this._phpUsesIndex.set(phpClass.documentUri.fsPath, phpClass.uses);
                        }
                    });
                });
                let phpClasses = Array.from(this._phpClassesIndex.values());
                this._cacheManager.set(phpClasses);
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(PHPClassStore.PHP_CLASS_NO_PROVIDER);
        }
    }
    clearCacheAndRefresh(uri) {
        this._cacheManager.clearClassByUri(uri).then(() => {
            this.refresh(uri);
        });
    }
    getPhpClass(className) {
        return this._phpClassesIndex.get(className);
    }
    getUsesForUri(uri) {
        return this._phpUsesIndex.get(uri.fsPath);
    }
}
PHPClassStore.PHP_CLASS_FETCH_MESSAGE = "Fetching PHP classes...";
PHPClassStore.PHP_CLASS_NO_PROVIDER = "Cannot retrieve PHP classes at the moment";
exports.PHPClassStore = PHPClassStore;
//# sourceMappingURL=PHPClassStore.js.map