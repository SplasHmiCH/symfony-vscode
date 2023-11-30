"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceQuickPickItem = /** @class */ (function () {
    function ServiceQuickPickItem(serviceDefinition) {
        this.serviceDefinition = serviceDefinition;
    }
    Object.defineProperty(ServiceQuickPickItem.prototype, "label", {
        get: function () {
            return this.serviceDefinition.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceQuickPickItem.prototype, "detail", {
        get: function () {
            return this.serviceDefinition.className;
        },
        enumerable: true,
        configurable: true
    });
    return ServiceQuickPickItem;
}());
exports.ServiceQuickPickItem = ServiceQuickPickItem;
