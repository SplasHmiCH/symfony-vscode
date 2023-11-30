"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parameter {
    constructor(name, value) {
        this.name = name;
        if (value === null) {
            this.value = "null";
        }
        else if (typeof value === "string") {
            this.value = value;
        }
        else if (typeof value === "number") {
            this.value = value.toString();
        }
        else if (typeof value === "boolean") {
            this.value = value ? "true" : "false";
        }
        else if (typeof value === "object" && Array.isArray(value)) {
            this.value = "array";
        }
        else {
            this.value = typeof value;
        }
    }
    acceptSearchCriteria(criteria) {
        if (this.name && this.name.match(criteria)) {
            return 2;
        }
        if (this.value && this.value.match(criteria)) {
            return 2;
        }
        return 0;
    }
    static fromJSON(jsonParameter) {
        return new Parameter(jsonParameter.name, jsonParameter.value);
    }
}
exports.Parameter = Parameter;
//# sourceMappingURL=Parameter.js.map