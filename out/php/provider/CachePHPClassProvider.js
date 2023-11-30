"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CachePHPClassProvider = /** @class */ (function () {
    function CachePHPClassProvider(cacheManager) {
        this._cacheManager = cacheManager;
    }
    CachePHPClassProvider.prototype.canUpdateAllUris = function () {
        return this._cacheManager.hasCachedData();
    };
    CachePHPClassProvider.prototype.canUpdateUri = function (uri) {
        return false;
    };
    CachePHPClassProvider.prototype.updateAllUris = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._cacheManager.hasCachedData()) {
                resolve(_this._cacheManager.get());
            }
            else {
                reject(CachePHPClassProvider.NO_CLASS_IN_CACHE);
            }
        });
    };
    CachePHPClassProvider.prototype.updateUri = function (uri) {
        return new Promise(function (resolve) {
            resolve([]);
        });
    };
    return CachePHPClassProvider;
}());
CachePHPClassProvider.NO_CLASS_IN_CACHE = "No cached classes";
exports.CachePHPClassProvider = CachePHPClassProvider;
