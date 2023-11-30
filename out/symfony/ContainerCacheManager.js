"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceDefinition_1 = require("./ServiceDefinition");
var RouteDefinition_1 = require("./RouteDefinition");
var Parameter_1 = require("./Parameter");
var ContainerCacheManager = /** @class */ (function () {
    function ContainerCacheManager(memento) {
        this._memento = memento;
    }
    ContainerCacheManager.prototype.hasCachedServices = function () {
        return this._memento.get(ContainerCacheManager.SERVICES_CACHE_KEY) !== undefined;
    };
    ContainerCacheManager.prototype.hasCachedRoutes = function () {
        return this._memento.get(ContainerCacheManager.ROUTES_CACHE_KEY) !== undefined;
    };
    ContainerCacheManager.prototype.hasCachedParameters = function () {
        return this._memento.get(ContainerCacheManager.PARAMETERS_CACHE_KEY) !== undefined;
    };
    ContainerCacheManager.prototype.getServices = function () {
        return this._memento.get(ContainerCacheManager.SERVICES_CACHE_KEY).map(function (jsonServiceDefinition) {
            return ServiceDefinition_1.ServiceDefinition.fromJSON(jsonServiceDefinition);
        });
    };
    ContainerCacheManager.prototype.getRoutes = function () {
        return this._memento.get(ContainerCacheManager.ROUTES_CACHE_KEY).map(function (jsonRouteDefinition) {
            return RouteDefinition_1.RouteDefinition.fromJSON(jsonRouteDefinition);
        });
    };
    ContainerCacheManager.prototype.getParameters = function () {
        return this._memento.get(ContainerCacheManager.PARAMETERS_CACHE_KEY).map(function (jsonParameter) {
            return Parameter_1.Parameter.fromJSON(jsonParameter);
        });
    };
    ContainerCacheManager.prototype.setServices = function (servicesDefinitions) {
        return this._memento.update(ContainerCacheManager.SERVICES_CACHE_KEY, servicesDefinitions);
    };
    ContainerCacheManager.prototype.setRoutes = function (routesDefinitions) {
        return this._memento.update(ContainerCacheManager.ROUTES_CACHE_KEY, routesDefinitions);
    };
    ContainerCacheManager.prototype.setParameters = function (parameters) {
        return this._memento.update(ContainerCacheManager.PARAMETERS_CACHE_KEY, parameters);
    };
    ContainerCacheManager.prototype.clearServices = function () {
        return this._memento.update(ContainerCacheManager.SERVICES_CACHE_KEY, undefined);
    };
    ContainerCacheManager.prototype.clearRoutes = function () {
        return this._memento.update(ContainerCacheManager.ROUTES_CACHE_KEY, undefined);
    };
    ContainerCacheManager.prototype.clearParameters = function () {
        return this._memento.update(ContainerCacheManager.PARAMETERS_CACHE_KEY, undefined);
    };
    return ContainerCacheManager;
}());
ContainerCacheManager.SERVICES_CACHE_KEY = "cached_container_store_services";
ContainerCacheManager.ROUTES_CACHE_KEY = "cached_container_store_routes";
ContainerCacheManager.PARAMETERS_CACHE_KEY = "cached_container_store_parameters";
exports.ContainerCacheManager = ContainerCacheManager;
