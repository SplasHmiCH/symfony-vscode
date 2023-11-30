"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PHPClass_1 = require("./PHPClass");
var PHPClassCacheManager = /** @class */ (function () {
    function PHPClassCacheManager(memento) {
        this._memento = memento;
    }
    PHPClassCacheManager.prototype.hasCachedData = function () {
        return this._memento.get(PHPClassCacheManager.CACHE_KEY) !== undefined;
    };
    PHPClassCacheManager.prototype.get = function () {
        return this._memento.get(PHPClassCacheManager.CACHE_KEY).map(function (jsonPhpClass) {
            return PHPClass_1.PHPClass.fromJSON(jsonPhpClass);
        });
    };
    PHPClassCacheManager.prototype.set = function (phpClasses) {
        return this._memento.update(PHPClassCacheManager.CACHE_KEY, phpClasses);
    };
    PHPClassCacheManager.prototype.clear = function () {
        return this._memento.update(PHPClassCacheManager.CACHE_KEY, undefined);
    };
    PHPClassCacheManager.prototype.clearClassByUri = function (phpClassUri) {
        var classes = this.get();
        var newClasses = [];
        classes.forEach(function (phpClass) {
            if (phpClass.documentUri !== phpClassUri) {
                newClasses.push(phpClass);
            }
        });
        return this.set(newClasses);
    };
    return PHPClassCacheManager;
}());
PHPClassCacheManager.CACHE_KEY = "cached_php_store";
exports.PHPClassCacheManager = PHPClassCacheManager;
