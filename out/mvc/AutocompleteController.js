"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ConfigurationFileProvider_1 = require("./editing/autocomplete/ConfigurationFileProvider");
const PHPServiceProvider_1 = require("./editing/autocomplete/PHPServiceProvider");
const ContainerHoverProvider_1 = require("./editing/hover/ContainerHoverProvider");
const ServiceDefinitionTreeItem_1 = require("./containerview/ServiceDefinitionTreeItem");
const ConfigurationFileServiceDefinitionProvider_1 = require("./editing/definition/ConfigurationFileServiceDefinitionProvider");
const PHPServiceDefinitionProvider_1 = require("./editing/definition/PHPServiceDefinitionProvider");
const ServiceQuickPickItem_1 = require("./editing/quickpick/ServiceQuickPickItem");
class AutocompleteController {
    constructor(containerStore, phpClassStore) {
        let configurationFileProvider = new ConfigurationFileProvider_1.ConfigurationFileProvider(containerStore);
        let phpServiceProvider = new PHPServiceProvider_1.PHPServiceProvider(containerStore);
        let hoverProvider = new ContainerHoverProvider_1.ContainerHoverProvider(containerStore);
        let confFileServiveDefinitionProvider = new ConfigurationFileServiceDefinitionProvider_1.ConfigurationFileServiceDefinitionProvider(containerStore, phpClassStore);
        let phpServiceDefinitionProvider = new PHPServiceDefinitionProvider_1.PHPServiceDefinitionProvider(containerStore, phpClassStore);
        let disposables = [];
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'yaml' }, configurationFileProvider, "@"));
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'xml' }, configurationFileProvider, "id=\""));
        disposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'php' }, phpServiceProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'yaml' }, hoverProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'xml' }, hoverProvider));
        disposables.push(vscode.languages.registerHoverProvider({ scheme: 'file', language: 'php' }, hoverProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'yaml' }, confFileServiveDefinitionProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'xml' }, confFileServiveDefinitionProvider));
        disposables.push(vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'php' }, phpServiceDefinitionProvider));
        this._disposable = vscode.Disposable.from(...disposables);
        vscode.commands.registerCommand('symfony-vscode.goToServiceDefinition', (args) => {
            if (args && args instanceof ServiceDefinitionTreeItem_1.ServiceDefinitionTreeItem) {
                this._goToServiceDefinition(args.serviceDefinition, confFileServiveDefinitionProvider);
            }
            else {
                vscode.window.showQuickPick(containerStore.serviceDefinitionList.map(serviceDefinition => {
                    return new ServiceQuickPickItem_1.ServiceQuickPickItem(serviceDefinition);
                })).then(item => {
                    if (item instanceof ServiceQuickPickItem_1.ServiceQuickPickItem) {
                        this._goToServiceDefinition(item.serviceDefinition, confFileServiveDefinitionProvider);
                    }
                });
            }
        });
    }
    _goToServiceDefinition(serviceDefinition, serviceDefinitionProvider) {
        let location = serviceDefinitionProvider.getLocationOfService(serviceDefinition);
        if (location) {
            vscode.window.showTextDocument(location.uri, {
                selection: location.range
            });
        }
        else {
            vscode.window.showErrorMessage("Class \"" + serviceDefinition.className + "\" not found");
        }
    }
    dispose() {
        this._disposable.dispose();
    }
}
exports.AutocompleteController = AutocompleteController;
//# sourceMappingURL=AutocompleteController.js.map