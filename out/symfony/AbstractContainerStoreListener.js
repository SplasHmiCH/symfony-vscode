"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractContainerStoreListener = /** @class */ (function () {
    function AbstractContainerStoreListener() {
    }
    AbstractContainerStoreListener.prototype.onServicesChanges = function (servicesDefinitions) { };
    AbstractContainerStoreListener.prototype.onRoutesChanges = function (routesDefinitions) { };
    AbstractContainerStoreListener.prototype.onParametersChanges = function (parameters) { };
    return AbstractContainerStoreListener;
}());
exports.AbstractContainerStoreListener = AbstractContainerStoreListener;
