"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceDefinition = /** @class */ (function () {
    function ServiceDefinition(id, className, isPublic, alias) {
        this.id = id;
        this.className = className;
        this.public = isPublic;
        this.alias = alias;
    }
    ServiceDefinition.prototype.isServiceIdAClassName = function () {
        return this.id.match(/([A-Z]|\\)/) !== null;
    };
    ServiceDefinition.prototype.acceptSearchCriteria = function (criteria) {
        if (this.id && this.id.match(criteria)) {
            return 2;
        }
        if (this.className && this.className.match(criteria)) {
            return 2;
        }
        if (this.alias && this.alias.match(criteria)) {
            return 1;
        }
        return 0;
    };
    ServiceDefinition.fromJSON = function (jsonServiceDefinition) {
        return new ServiceDefinition(jsonServiceDefinition.id, jsonServiceDefinition.className, jsonServiceDefinition.public, jsonServiceDefinition.alias);
    };
    return ServiceDefinition;
}());
exports.ServiceDefinition = ServiceDefinition;
