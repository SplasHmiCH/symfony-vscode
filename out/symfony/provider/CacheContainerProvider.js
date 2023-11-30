"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheContainerProvider = /** @class */ (function () {
    function CacheContainerProvider(cacheManager) {
        this._cacheManager = cacheManager;
    }
    CacheContainerProvider.prototype.canProvideServiceDefinitions = function () {
        return this._cacheManager.hasCachedServices();
    };
    CacheContainerProvider.prototype.canProvideRouteDefinitions = function () {
        return this._cacheManager.hasCachedRoutes();
    };
    CacheContainerProvider.prototype.canProvideParameters = function () {
        return this._cacheManager.hasCachedParameters();
    };
    CacheContainerProvider.prototype.provideServiceDefinitions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._cacheManager.hasCachedServices()) {
                resolve(_this._cacheManager.getServices());
            }
            else {
                reject(CacheContainerProvider.NO_SERVICES_IN_CACHE);
            }
        });
    };
    CacheContainerProvider.prototype.provideRouteDefinitions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._cacheManager.hasCachedRoutes()) {
                resolve(_this._cacheManager.getRoutes());
            }
            else {
                reject(CacheContainerProvider.NO_ROUTES_IN_CACHE);
            }
        });
    };
    CacheContainerProvider.prototype.provideParameters = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._cacheManager.hasCachedParameters()) {
                resolve(_this._cacheManager.getParameters());
            }
            else {
                reject(CacheContainerProvider.NO_PARAMETERS_IN_CACHE);
            }
        });
    };
    return CacheContainerProvider;
}());
CacheContainerProvider.NO_SERVICES_IN_CACHE = "No services in cache";
CacheContainerProvider.NO_ROUTES_IN_CACHE = "No routes in cache";
CacheContainerProvider.NO_PARAMETERS_IN_CACHE = "No parameters in cache";
exports.CacheContainerProvider = CacheContainerProvider;
