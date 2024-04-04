"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachePHPClassProvider = void 0;
class CachePHPClassProvider {
    constructor(cacheManager) {
        this._cacheManager = cacheManager;
    }
    canUpdateAllUris() {
        return this._cacheManager.hasCachedData();
    }
    canUpdateUri(uri) {
        return false;
    }
    updateAllUris() {
        return new Promise((resolve, reject) => {
            if (this._cacheManager.hasCachedData()) {
                resolve(this._cacheManager.get());
            }
            else {
                reject(CachePHPClassProvider.NO_CLASS_IN_CACHE);
            }
        });
    }
    updateUri(uri) {
        return new Promise((resolve) => {
            resolve([]);
        });
    }
}
exports.CachePHPClassProvider = CachePHPClassProvider;
CachePHPClassProvider.NO_CLASS_IN_CACHE = "No cached classes";
//# sourceMappingURL=CachePHPClassProvider.js.map