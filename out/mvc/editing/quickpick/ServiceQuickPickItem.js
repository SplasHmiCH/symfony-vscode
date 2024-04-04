"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceQuickPickItem = void 0;
class ServiceQuickPickItem {
    constructor(serviceDefinition) {
        this.serviceDefinition = serviceDefinition;
    }
    get label() {
        return this.serviceDefinition.id;
    }
    get detail() {
        return this.serviceDefinition.className;
    }
}
exports.ServiceQuickPickItem = ServiceQuickPickItem;
//# sourceMappingURL=ServiceQuickPickItem.js.map