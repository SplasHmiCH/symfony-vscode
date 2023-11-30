"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var ConfigurationFileProvider_1 = require("./editing/autocomplete/ConfigurationFileProvider");
var PHPServiceProvider_1 = require("./editing/autocomplete/PHPServiceProvider");
var ContainerHoverProvider_1 = require("./editing/hover/ContainerHoverProvider");
var ServiceDefinitionTreeItem_1 = require("./containerview/ServiceDefinitionTreeItem");
var ConfigurationFileServiceDefinitionProvider_1 = require("./editing/definition/ConfigurationFileServiceDefinitionProvider");
var PHPServiceDefinitionProvider_1 = require("./editing/definition/PHPServiceDefinitionProvider");
var ServiceQuickPickItem_1 = require("./editing/quickpick/ServiceQuickPickItem");
var AutocompleteController = /** @class */ (function () {
    function AutocompleteController(containerStore, phpClassStore) {
        var _a;
        var _this = this;
        var configurationFileProvider = new ConfigurationFileProvider_1.ConfigurationFileProvider(containerStore);
        var phpServiceProvider = new PHPServiceProvider_1.PHPServiceProvider(containerStore);
        var hoverProvider = new ContainerHoverProvider_1.ContainerHoverProvider(containerStore);
        var confFileServiveDefinitionProvider = new ConfigurationFileServiceDefinitionProvider_1.ConfigurationFileServiceDefinitionProvider(containerStore, phpClassStore);
        var phpServiceDefinitionProvider = new PHPServiceDefinitionProvider_1.PHPServiceDefinitionProvider(containerStore, phpClassStore);
        var disposables = [];
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'yaml' }, configurationFileProvider, "@"));
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'xml' }, configurationFileProvider, "id=\""));
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'php' }, phpServiceProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'yaml' }, hoverProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'xml' }, hoverProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'php' }, hoverProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'yaml' }, confFileServiveDefinitionProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'xml' }, confFileServiveDefinitionProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'php' }, phpServiceDefinitionProvider));
        this._disposable = (_a = vscode.Disposable).from.apply(_a, disposables);
        vscode.commands.registerCommand('symfony-vscode.goToServiceDefinition', function (args) {
            if (args && args instanceof ServiceDefinitionTreeItem_1.ServiceDefinitionTreeItem) {
                _this._goToServiceDefinition(args.serviceDefinition, confFileServiveDefinitionProvider);
            }
            else {
                vscode.window.showQuickPick(containerStore.serviceDefinitionList.map(function (serviceDefinition) {
                    return new ServiceQuickPickItem_1.ServiceQuickPickItem(serviceDefinition);
                })).then(function (item) {
                    if (item instanceof ServiceQuickPickItem_1.ServiceQuickPickItem) {
                        _this._goToServiceDefinition(item.serviceDefinition, confFileServiveDefinitionProvider);
                    }
                });
            }
        });
    }
    AutocompleteController.prototype._goToServiceDefinition = function (serviceDefinition, serviceDefinitionProvider) {
        var location = serviceDefinitionProvider.getLocationOfService(serviceDefinition);
        if (location) {
            vscode.window.showTextDocument(location.uri, {
                selection: location.range
            });
        }
        else {
            vscode.window.showErrorMessage("Class \"" + serviceDefinition.className + "\" not found");
        }
    };
    AutocompleteController.prototype.dispose = function () {
        this._disposable.dispose();
    };
    return AutocompleteController;
}());
exports.AutocompleteController = AutocompleteController;
