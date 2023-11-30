"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceDefinition_1 = require("./ServiceDefinition");
const RouteDefinition_1 = require("./RouteDefinition");
const Parameter_1 = require("./Parameter");
class ContainerCacheManager {
    constructor(memento) {
        this._memento = memento;
    }
    hasCachedServices() {
        return this._memento.get(ContainerCacheManager.SERVICES_CACHE_KEY) !== undefined;
    }
    hasCachedRoutes() {
        return this._memento.get(ContainerCacheManager.ROUTES_CACHE_KEY) !== undefined;
    }
    hasCachedParameters() {
        return this._memento.get(ContainerCacheManager.PARAMETERS_CACHE_KEY) !== undefined;
    }
    getServices() {
        return this._memento.get(ContainerCacheManager.SERVICES_CACHE_KEY).map(jsonServiceDefinition => {
            return ServiceDefinition_1.ServiceDefinition.fromJSON(jsonServiceDefinition);
        });
    }
    getRoutes() {
        return this._memento.get(ContainerCacheManager.ROUTES_CACHE_KEY).map(jsonRouteDefinition => {
            return RouteDefinition_1.RouteDefinition.fromJSON(jsonRouteDefinition);
        });
    }
    getParameters() {
        return this._memento.get(ContainerCacheManager.PARAMETERS_CACHE_KEY).map(jsonParameter => {
            return Parameter_1.Parameter.fromJSON(jsonParameter);
        });
    }
    setServices(servicesDefinitions) {
        return this._memento.update(ContainerCacheManager.SERVICES_CACHE_KEY, servicesDefinitions);
    }
    setRoutes(routesDefinitions) {
        return this._memento.update(ContainerCacheManager.ROUTES_CACHE_KEY, routesDefinitions);
    }
    setParameters(parameters) {
        return this._memento.update(ContainerCacheManager.PARAMETERS_CACHE_KEY, parameters);
    }
    clearServices() {
        return this._memento.update(ContainerCacheManager.SERVICES_CACHE_KEY, undefined);
    }
    clearRoutes() {
        return this._memento.update(ContainerCacheManager.ROUTES_CACHE_KEY, undefined);
    }
    clearParameters() {
        return this._memento.update(ContainerCacheManager.PARAMETERS_CACHE_KEY, undefined);
    }
}
ContainerCacheManager.SERVICES_CACHE_KEY = "cached_container_store_services";
ContainerCacheManager.ROUTES_CACHE_KEY = "cached_container_store_routes";
ContainerCacheManager.PARAMETERS_CACHE_KEY = "cached_container_store_parameters";
exports.ContainerCacheManager = ContainerCacheManager;
//# sourceMappingURL=ContainerCacheManager.js.map