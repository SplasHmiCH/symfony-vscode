"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheContainerProvider {
    constructor(cacheManager) {
        this._cacheManager = cacheManager;
    }
    canProvideServiceDefinitions() {
        return this._cacheManager.hasCachedServices();
    }
    canProvideRouteDefinitions() {
        return this._cacheManager.hasCachedRoutes();
    }
    canProvideParameters() {
        return this._cacheManager.hasCachedParameters();
    }
    provideServiceDefinitions() {
        return new Promise((resolve, reject) => {
            if (this._cacheManager.hasCachedServices()) {
                resolve(this._cacheManager.getServices());
            }
            else {
                reject(CacheContainerProvider.NO_SERVICES_IN_CACHE);
            }
        });
    }
    provideRouteDefinitions() {
        return new Promise((resolve, reject) => {
            if (this._cacheManager.hasCachedRoutes()) {
                resolve(this._cacheManager.getRoutes());
            }
            else {
                reject(CacheContainerProvider.NO_ROUTES_IN_CACHE);
            }
        });
    }
    provideParameters() {
        return new Promise((resolve, reject) => {
            if (this._cacheManager.hasCachedParameters()) {
                resolve(this._cacheManager.getParameters());
            }
            else {
                reject(CacheContainerProvider.NO_PARAMETERS_IN_CACHE);
            }
        });
    }
}
CacheContainerProvider.NO_SERVICES_IN_CACHE = "No services in cache";
CacheContainerProvider.NO_ROUTES_IN_CACHE = "No routes in cache";
CacheContainerProvider.NO_PARAMETERS_IN_CACHE = "No parameters in cache";
exports.CacheContainerProvider = CacheContainerProvider;
//# sourceMappingURL=CacheContainerProvider.js.map