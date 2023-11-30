"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ConsoleContainerProvider_1 = require("./provider/ConsoleContainerProvider");
const CacheContainerProvider_1 = require("./provider/CacheContainerProvider");
class ContainerStore {
    constructor(cacheManager) {
        this._containerProviders = [];
        this._serviceDefinitionStore = [];
        this._routeDefinitionStore = [];
        this._parameterStore = [];
        this._listeners = [];
        this._cacheManager = cacheManager;
        this._containerProviders.push(new CacheContainerProvider_1.CacheContainerProvider(cacheManager));
        this._containerProviders.push(new ConsoleContainerProvider_1.ConsoleContainerProvider());
    }
    refreshAll() {
        return new Promise((resolve, reject) => {
            let hasValidProvider = this._containerProviders.some((provider) => {
                if (provider.canProvideServiceDefinitions() && provider.canProvideRouteDefinitions() && provider.canProvideParameters()) {
                    vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.SERVICES_FETCH_MESSAGE }, (progress, token) => {
                        return provider.provideServiceDefinitions().then(servicesDefinitions => {
                            this._serviceDefinitionStore = servicesDefinitions;
                            this._cacheManager.setServices(servicesDefinitions);
                            this._listeners.forEach(listerner => {
                                listerner.onServicesChanges(servicesDefinitions);
                            });
                            vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.ROUTES_FETCH_MESSAGE }, (progress, token) => {
                                return provider.provideRouteDefinitions().then(routeDefinitions => {
                                    this._routeDefinitionStore = routeDefinitions;
                                    this._cacheManager.setRoutes(routeDefinitions);
                                    this._listeners.forEach(listerner => {
                                        listerner.onRoutesChanges(routeDefinitions);
                                    });
                                    vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.PARAMETERS_FETCH_MESSAGE }, (progress, token) => {
                                        return provider.provideParameters().then(parameters => {
                                            this._parameterStore = parameters;
                                            this._cacheManager.setParameters(parameters);
                                            this._listeners.forEach(listerner => {
                                                listerner.onParametersChanges(parameters);
                                            });
                                            resolve();
                                        }).catch(reason => {
                                            vscode.window.showErrorMessage(reason);
                                            reject();
                                        });
                                    });
                                }).catch(reason => {
                                    vscode.window.showErrorMessage(reason);
                                    reject();
                                });
                            });
                        }).catch(reason => {
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
    }
    clearCacheAndRefreshAll() {
        this._cacheManager.clearServices().then(() => {
            this._cacheManager.clearRoutes().then(() => {
                this._cacheManager.clearParameters().then(() => {
                    this.refreshAll();
                });
            });
        });
    }
    refreshServiceDefinitions() {
        let hasValidProvider = this._containerProviders.some(provider => {
            if (provider.canProvideServiceDefinitions()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.SERVICES_FETCH_MESSAGE }, (progress, token) => {
                    return provider.provideServiceDefinitions().then(servicesDefinitions => {
                        this._serviceDefinitionStore = servicesDefinitions;
                        this._cacheManager.setServices(servicesDefinitions);
                        this._listeners.forEach(listener => {
                            listener.onServicesChanges(servicesDefinitions);
                        });
                    }).catch(reason => {
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
    }
    clearCacheAndRefreshServices() {
        this._cacheManager.clearServices().then(() => {
            this.refreshServiceDefinitions();
        });
    }
    refreshRouteDefinitions() {
        let hasValidProvider = this._containerProviders.some(provider => {
            if (provider.canProvideRouteDefinitions()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.ROUTES_FETCH_MESSAGE }, (progress, token) => {
                    return provider.provideRouteDefinitions().then(routeDefinitions => {
                        this._routeDefinitionStore = routeDefinitions;
                        this._cacheManager.setRoutes(routeDefinitions);
                        this._listeners.forEach(listener => {
                            listener.onRoutesChanges(routeDefinitions);
                        });
                    }).catch(reason => {
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
    }
    clearCacheAndRefreshRoutes() {
        this._cacheManager.clearRoutes().then(() => {
            this.refreshRouteDefinitions();
        });
    }
    refreshParameters() {
        let hasValidProvider = this._containerProviders.some(provider => {
            if (provider.canProvideParameters()) {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: ContainerStore.PARAMETERS_FETCH_MESSAGE }, (progress, token) => {
                    return provider.provideParameters().then(parameters => {
                        this._parameterStore = parameters;
                        this._cacheManager.setParameters(parameters);
                        this._listeners.forEach(listener => {
                            listener.onParametersChanges(parameters);
                        });
                    }).catch(reason => {
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
    }
    clearCacheAndRefreshParameters() {
        this._cacheManager.clearParameters().then(() => {
            this.refreshParameters();
        });
    }
    subscribeListerner(listener) {
        this._listeners.push(listener);
    }
    get serviceDefinitionList() {
        return this._serviceDefinitionStore;
    }
    get routeDefinitionList() {
        return this._routeDefinitionStore;
    }
    get parameterList() {
        return this._parameterStore;
    }
}
ContainerStore.SERVICES_FETCH_MESSAGE = "Fetching Symfony services definitions...";
ContainerStore.ROUTES_FETCH_MESSAGE = "Fetching Symfony routes definitions...";
ContainerStore.PARAMETERS_FETCH_MESSAGE = "Fetching Symfony parameters...";
ContainerStore.CONTAINER_NO_PROVIDER = "Cannot retrieve container elements at the moment";
exports.ContainerStore = ContainerStore;
//# sourceMappingURL=ContainerStore.js.map