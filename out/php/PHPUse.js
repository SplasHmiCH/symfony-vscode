"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PHPUse = /** @class */ (function () {
    function PHPUse(className, alias) {
        this.className = className;
        this.alias = alias;
    }
    Object.defineProperty(PHPUse.prototype, "shortName", {
        get: function () {
            if (this.alias) {
                return this.alias;
            }
            else {
                return this.className.split('\\').pop();
            }
        },
        enumerable: true,
        configurable: true
    });
    return PHPUse;
}());
exports.PHPUse = PHPUse;
