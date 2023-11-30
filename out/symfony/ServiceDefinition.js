"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceDefinition {
    constructor(id, className, isPublic, alias) {
        this.id = id;
        this.className = className;
        this.public = isPublic;
        this.alias = alias;
    }
    isServiceIdAClassName() {
        return this.id.match(/([A-Z]|\\)/) !== null;
    }
    acceptSearchCriteria(criteria) {
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
    }
    static fromJSON(jsonServiceDefinition) {
        return new ServiceDefinition(jsonServiceDefinition.id, jsonServiceDefinition.className, jsonServiceDefinition.public, jsonServiceDefinition.alias);
    }
}
exports.ServiceDefinition = ServiceDefinition;
//# sourceMappingURL=ServiceDefinition.js.map