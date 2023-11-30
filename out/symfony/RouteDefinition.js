"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteDefinition = /** @class */ (function () {
    function RouteDefinition(id, path, method, action) {
        this.id = id;
        this.path = path;
        this.method = method;
        this.action = action;
    }
    RouteDefinition.prototype.acceptSearchCriteria = function (criteria) {
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
    };
    RouteDefinition.fromJSON = function (jsonRouteDefinition) {
        return new RouteDefinition(jsonRouteDefinition.id, jsonRouteDefinition.path, jsonRouteDefinition.method, jsonRouteDefinition.action);
    };
    return RouteDefinition;
}());
exports.RouteDefinition = RouteDefinition;
