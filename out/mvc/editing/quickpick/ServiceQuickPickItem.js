"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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