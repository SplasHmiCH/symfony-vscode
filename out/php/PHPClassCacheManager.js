"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHPClass_1 = require("./PHPClass");
class PHPClassCacheManager {
    constructor(memento) {
        this._memento = memento;
    }
    hasCachedData() {
        return this._memento.get(PHPClassCacheManager.CACHE_KEY) !== undefined;
    }
    get() {
        return this._memento.get(PHPClassCacheManager.CACHE_KEY).map(jsonPhpClass => {
            return PHPClass_1.PHPClass.fromJSON(jsonPhpClass);
        });
    }
    set(phpClasses) {
        return this._memento.update(PHPClassCacheManager.CACHE_KEY, phpClasses);
    }
    clear() {
        return this._memento.update(PHPClassCacheManager.CACHE_KEY, undefined);
    }
    clearClassByUri(phpClassUri) {
        let classes = this.get();
        let newClasses = [];
        classes.forEach(phpClass => {
            if (phpClass.documentUri !== phpClassUri) {
                newClasses.push(phpClass);
            }
        });
        return this.set(newClasses);
    }
}
PHPClassCacheManager.CACHE_KEY = "cached_php_store";
exports.PHPClassCacheManager = PHPClassCacheManager;
//# sourceMappingURL=PHPClassCacheManager.js.map