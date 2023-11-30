"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ConsoleContainerProvider_1 = require("./provider/ConsoleContainerProvider");
var CacheContainerProvider_1 = require("./provider/CacheContainerProvider");
var ContainerStore = /** @class */ (function () {
    function ContainerStore(cacheManager) {
        this._containerProviders = [];
        this._serviceDefinitionStore = [];
        this._routeDefinitionStore = [];
        this._parameterStore = [];
        this._listeners = [];
        this._cacheManager = cacheManager;
        this._containerProviders.push(new CacheContainerProvider_1.CacheContainerProvider(cacheManager));
        this._containerProviders.push(new ConsoleContainerProvider_1.ConsoleContainerProvider());
    }
    ContainerStore.prototype.refreshAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var hasValidProvider = _this._containerProviders.some(function (provider) {
                if (provider.canProvideServiceDefinitions() && provider.canProvideRouteDefinitions() && provider.canProvideParameters()) {
                    vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.SERVICES_FETCH_MESSAGE }, function (progress, token) {
                        return provider.provideServiceDefinitions().then(function (servicesDefinitions) {
                            _this._serviceDefinitionStore = servicesDefinitions;
                            _this._cacheManager.setServices(servicesDefinitions);
                            _this._listeners.forEach(function (listerner) {
                                listerner.onServicesChanges(servicesDefinitions);
                            });
                            vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.ROUTES_FETCH_MESSAGE }, function (progress, token) {
                                return provider.provideRouteDefinitions().then(function (routeDefinitions) {
                                    _this._routeDefinitionStore = routeDefinitions;
                                    _this._cacheManager.setRoutes(routeDefinitions);
                                    _this._listeners.forEach(function (listerner) {
                                        listerner.onRoutesChanges(routeDefinitions);
                                    });
                                    vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.PARAMETERS_FETCH_MESSAGE }, function (progress, token) {
                                        return provider.provideParameters().then(function (parameters) {
                                            _this._parameterStore = parameters;
                                            _this._cacheManager.setParameters(parameters);
                                            _this._listeners.forEach(function (listerner) {
                                                listerner.onParametersChanges(parameters);
                                            });
                                            resolve();
                                        }).catch(function (reason) {
                                            vscode.window.showErrorMessage(reason);
                                            reject();
                                        });
                                    });
                                }).catch(function (reason) {
                                    vscode.window.showErrorMessage(reason);
                                    reject();
                                });
                            });
                        }).catch(function (reason) {
                            vscode.window.showErrorMessage(reason);
                            reject();
                        });
                    });
                    return true;
                }
                else {
                    return false;
                }
            });
            if (!hasValidProvider) {
                vscode.window.showErrorMessage(ContainerStore.CONTAINER_NO_PROVIDER);
            }
        });
    };
    ContainerStore.prototype.clearCacheAndRefreshAll = function () {
        var _this = this;
        this._cacheManager.clearServices().then(function () {
            _this._cacheManager.clearRoutes().then(function () {
                _this._cacheManager.clearParameters().then(function () {
                    _this.refreshAll();
                });
            });
        });
    };
    ContainerStore.prototype.refreshServiceDefinitions = function () {
        var _this = this;
        var hasValidProvider = this._containerProviders.some(function (provider) {
            if (provider.canProvideServiceDefinitions()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.SERVICES_FETCH_MESSAGE }, function (progress, token) {
                    return provider.provideServiceDefinitions().then(function (servicesDefinitions) {
                        _this._serviceDefinitionStore = servicesDefinitions;
                        _this._cacheManager.setServices(servicesDefinitions);
                        _this._listeners.forEach(function (listener) {
                            listener.onServicesChanges(servicesDefinitions);
                        });
                    }).catch(function (reason) {
                        vscode.window.showErrorMessage(reason);
                    });
                });
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(ContainerStore.CONTAINER_NO_PROVIDER);
        }
    };
    ContainerStore.prototype.clearCacheAndRefreshServices = function () {
        var _this = this;
        this._cacheManager.clearServices().then(function () {
            _this.refreshServiceDefinitions();
        });
    };
    ContainerStore.prototype.refreshRouteDefinitions = function () {
        var _this = this;
        var hasValidProvider = this._containerProviders.some(function (provider) {
            if (provider.canProvideRouteDefinitions()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.ROUTES_FETCH_MESSAGE }, function (progress, token) {
                    return provider.provideRouteDefinitions().then(function (routeDefinitions) {
                        _this._routeDefinitionStore = routeDefinitions;
                        _this._cacheManager.setRoutes(routeDefinitions);
                        _this._listeners.forEach(function (listener) {
                            listener.onRoutesChanges(routeDefinitions);
                        });
                    }).catch(function (reason) {
                        vscode.window.showErrorMessage(reason);
                    });
                });
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(ContainerStore.CONTAINER_NO_PROVIDER);
        }
    };
    ContainerStore.prototype.clearCacheAndRefreshRoutes = function () {
        var _this = this;
        this._cacheManager.clearRoutes().then(function () {
            _this.refreshRouteDefinitions();
        });
    };
    ContainerStore.prototype.refreshParameters = function () {
        var _this = this;
        var hasValidProvider = this._containerProviders.some(function (provider) {
            if (provider.canProvideParameters()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.PARAMETERS_FETCH_MESSAGE }, function (progress, token) {
                    return provider.provideParameters().then(function (parameters) {
                        _this._parameterStore = parameters;
                        _this._cacheManager.setParameters(parameters);
                        _this._listeners.forEach(function (listener) {
                            listener.onParametersChanges(parameters);
                        });
                    }).catch(function (reason) {
                        vscode.window.showErrorMessage(reason);
                    });
                });
                return true;
            }
            else {
                return false;
            }
        });
        if (!hasValidProvider) {
            vscode.window.showErrorMessage(ContainerStore.CONTAINER_NO_PROVIDER);
        }
    };
    ContainerStore.prototype.clearCacheAndRefreshParameters = function () {
        var _this = this;
        this._cacheManager.clearParameters().then(function () {
            _this.refreshParameters();
        });
    };
    ContainerStore.prototype.subscribeListerner = function (listener) {
        this._listeners.push(listener);
    };
    Object.defineProperty(ContainerStore.prototype, "serviceDefinitionList", {
        get: function () {
            return this._serviceDefinitionStore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerStore.prototype, "routeDefinitionList", {
        get: function () {
            return this._routeDefinitionStore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerStore.prototype, "parameterList", {
        get: function () {
            return this._parameterStore;
        },
        enumerable: true,
        configurable: true
    });
    return ContainerStore;
}());
ContainerStore.SERVICES_FETCH_MESSAGE = "Fetching Symfony services definitions...";
ContainerStore.ROUTES_FETCH_MESSAGE = "Fetching Symfony routes definitions...";
ContainerStore.PARAMETERS_FETCH_MESSAGE = "Fetching Symfony parameters...";
ContainerStore.CONTAINER_NO_PROVIDER = "Cannot retrieve container elements at the moment";
exports.ContainerStore = ContainerStore;
