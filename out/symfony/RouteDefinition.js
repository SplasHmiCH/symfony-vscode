"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteDefinition {
    constructor(id, path, method, action) {
        this.id = id;
        this.path = path;
        this.method = method;
        this.action = action;
    }
    acceptSearchCriteria(criteria) {
        if (this.id && this.id.match(criteria)) {
            return 2;
        }
        if (this.path && this.path.match(criteria)) {
            return 2;
        }
        if (this.action && this.action.match(criteria)) {
            return 2;
        }
        return 0;
    }
    static fromJSON(jsonRouteDefinition) {
        return new RouteDefinition(jsonRouteDefinition.id, jsonRouteDefinition.path, jsonRouteDefinition.method, jsonRouteDefinition.action);
    }
}
exports.RouteDefinition = RouteDefinition;
//# sourceMappingURL=RouteDefinition.js.map