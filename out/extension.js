'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var ServiceDefintionViewProvider_1 = require("./mvc/containerview/ServiceDefintionViewProvider");
var ContainerStore_1 = require("./symfony/ContainerStore");
var RouteDefinitionViewProvider_1 = require("./mvc/containerview/RouteDefinitionViewProvider");
var FileWatchController_1 = require("./mvc/FileWatchController");
var AutocompleteController_1 = require("./mvc/AutocompleteController");
var ParameterViewProvider_1 = require("./mvc/containerview/ParameterViewProvider");
var ServiceDocumentationCodeActionProvider_1 = require("./mvc/editing/codeaction/ServiceDocumentationCodeActionProvider");
var ServicesCommandController_1 = require("./mvc/ServicesCommandController");
var RoutesCommandController_1 = require("./mvc/RoutesCommandController");
var ParametersCommandController_1 = require("./mvc/ParametersCommandController");
var PHPClassStore_1 = require("./php/PHPClassStore");
var PHPClassesController_1 = require("./mvc/PHPClassesController");
var PHPClassCacheManager_1 = require("./php/PHPClassCacheManager");
var ContainerCacheManager_1 = require("./symfony/ContainerCacheManager");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var phpClassCacheManager = new PHPClassCacheManager_1.PHPClassCacheManager(context.workspaceState);
    var containerCacheManager = new ContainerCacheManager_1.ContainerCacheManager(context.workspaceState);
    var containerStore = new ContainerStore_1.ContainerStore(containerCacheManager);
    var phpClassStore = new PHPClassStore_1.PHPClassStore(phpClassCacheManager);
    var serviceDefinitionViewProvider = new ServiceDefintionViewProvider_1.ServiceDefintionViewProvider();
    var routeDefinitionViewProvider = new RouteDefinitionViewProvider_1.RouteDefinitionViewProvider();
    var parameterViewProvider = new ParameterViewProvider_1.ParameterViewProvider();
    containerStore.subscribeListerner(serviceDefinitionViewProvider);
    containerStore.subscribeListerner(routeDefinitionViewProvider);
    containerStore.subscribeListerner(parameterViewProvider);
    vscode.commands.registerCommand('symfony-vscode.refreshContainer', function () {
        containerStore.clearCacheAndRefreshAll();
    });
    vscode.window.registerTreeDataProvider("serviceDefinitionsView", serviceDefinitionViewProvider);
    var servicesCommandController = new ServicesCommandController_1.ServicesCommandController(containerStore, serviceDefinitionViewProvider);
    vscode.window.registerTreeDataProvider("routeDefinitionsView", routeDefinitionViewProvider);
    var routesCommandController = new RoutesCommandController_1.RoutesCommandController(containerStore, routeDefinitionViewProvider);
    vscode.window.registerTreeDataProvider("parametersView", parameterViewProvider);
    var parametersCommandController = new ParametersCommandController_1.ParametersCommandController(containerStore, parameterViewProvider);
    if (vscode.workspace.getConfiguration("symfony-vscode").get("enableFileWatching")) {
        var fileWatchController = new FileWatchController_1.FileWatchController(containerStore, phpClassStore);
        context.subscriptions.push(fileWatchController);
    }
    var autocompleteController = new AutocompleteController_1.AutocompleteController(containerStore, phpClassStore);
    context.subscriptions.push(autocompleteController);
    var serviceDocCodeActionProvider = new ServiceDocumentationCodeActionProvider_1.ServiceDocumentationCodeActionProvider(phpClassStore);
    containerStore.subscribeListerner(serviceDocCodeActionProvider);
    vscode.languages.registerCodeActionsProvider({ scheme: "file", language: "php" }, serviceDocCodeActionProvider);
    var phpClassesController = new PHPClassesController_1.PHPClassesController(phpClassStore);
    containerStore.refreshAll().then(function () {
        phpClassStore.refreshAll();
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
