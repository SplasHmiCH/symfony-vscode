"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHPUse = void 0;
class PHPUse {
    constructor(className, alias) {
        this.className = className;
        this.alias = alias;
    }
    get shortName() {
        if (this.alias) {
            return this.alias;
        }
        else {
            return this.className.split('\\').pop();
        }
    }
}
exports.PHPUse = PHPUse;
//# sourceMappingURL=PHPUse.js.map