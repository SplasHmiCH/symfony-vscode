'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const ServiceDefintionViewProvider_1 = require("./mvc/containerview/ServiceDefintionViewProvider");
const ContainerStore_1 = require("./symfony/ContainerStore");
const RouteDefinitionViewProvider_1 = require("./mvc/containerview/RouteDefinitionViewProvider");
const FileWatchController_1 = require("./mvc/FileWatchController");
const AutocompleteController_1 = require("./mvc/AutocompleteController");
const ParameterViewProvider_1 = require("./mvc/containerview/ParameterViewProvider");
const ServiceDocumentationCodeActionProvider_1 = require("./mvc/editing/codeaction/ServiceDocumentationCodeActionProvider");
const ServicesCommandController_1 = require("./mvc/ServicesCommandController");
const RoutesCommandController_1 = require("./mvc/RoutesCommandController");
const ParametersCommandController_1 = require("./mvc/ParametersCommandController");
const PHPClassStore_1 = require("./php/PHPClassStore");
const PHPClassesController_1 = require("./mvc/PHPClassesController");
const PHPClassCacheManager_1 = require("./php/PHPClassCacheManager");
const ContainerCacheManager_1 = require("./symfony/ContainerCacheManager");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let phpClassCacheManager = new PHPClassCacheManager_1.PHPClassCacheManager(context.workspaceState);
    let containerCacheManager = new ContainerCacheManager_1.ContainerCacheManager(context.workspaceState);
    let containerStore = new ContainerStore_1.ContainerStore(containerCacheManager);
    let phpClassStore = new PHPClassStore_1.PHPClassStore(phpClassCacheManager);
    const serviceDefinitionViewProvider = new ServiceDefintionViewProvider_1.ServiceDefintionViewProvider();
    const routeDefinitionViewProvider = new RouteDefinitionViewProvider_1.RouteDefinitionViewProvider();
    const parameterViewProvider = new ParameterViewProvider_1.ParameterViewProvider();
    containerStore.subscribeListerner(serviceDefinitionViewProvider);
    containerStore.subscribeListerner(routeDefinitionViewProvider);
    containerStore.subscribeListerner(parameterViewProvider);
    vscode.commands.registerCommand('symfony-vscode.refreshContainer', () => {
        containerStore.clearCacheAndRefreshAll();
    });
    vscode.window.registerTreeDataProvider("serviceDefinitionsView", serviceDefinitionViewProvider);
    let servicesCommandController = new ServicesCommandController_1.ServicesCommandController(containerStore, serviceDefinitionViewProvider);
    vscode.window.registerTreeDataProvider("routeDefinitionsView", routeDefinitionViewProvider);
    let routesCommandController = new RoutesCommandController_1.RoutesCommandController(containerStore, routeDefinitionViewProvider);
    vscode.window.registerTreeDataProvider("parametersView", parameterViewProvider);
    let parametersCommandController = new ParametersCommandController_1.ParametersCommandController(containerStore, parameterViewProvider);
    if (vscode.workspace.getConfiguration("symfony-vscode").get("enableFileWatching")) {
        let fileWatchController = new FileWatchController_1.FileWatchController(containerStore, phpClassStore);
        context.subscriptions.push(fileWatchController);
    }
    let autocompleteController = new AutocompleteController_1.AutocompleteController(containerStore, phpClassStore);
    context.subscriptions.push(autocompleteController);
    let serviceDocCodeActionProvider = new ServiceDocumentationCodeActionProvider_1.ServiceDocumentationCodeActionProvider(phpClassStore);
    containerStore.subscribeListerner(serviceDocCodeActionProvider);
    vscode.languages.registerCodeActionsProvider({ scheme: "file", language: "php" }, serviceDocCodeActionProvider);
    let phpClassesController = new PHPClassesController_1.PHPClassesController(phpClassStore);
    containerStore.refreshAll().then(() => {
        phpClassStore.refreshAll();
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map