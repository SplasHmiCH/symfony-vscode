"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parameter = /** @class */ (function () {
    function Parameter(name, value) {
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
    Parameter.prototype.acceptSearchCriteria = function (criteria) {
        if (this.name && this.name.match(criteria)) {
            return 2;
        }
        if (this.value && this.value.match(criteria)) {
            return 2;
        }
        return 0;
    };
    Parameter.fromJSON = function (jsonParameter) {
        return new Parameter(jsonParameter.name, jsonParameter.value);
    };
    return Parameter;
}());
exports.Parameter = Parameter;
