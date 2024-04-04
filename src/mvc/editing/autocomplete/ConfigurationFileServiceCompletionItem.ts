import * as vscode from "vscode"
import { ServiceDefinition } from "../../../symfony/ServiceDefinition";

export class ConfigurationFileServiceCompletionItem extends vscode.CompletionItem {
    private _serviceDefinition: ServiceDefinition

    constructor(serviceDefinition: ServiceDefinition) {
        super(serviceDefinition.id, vscode.CompletionItemKind.Reference)
        this._serviceDefinition = serviceDefinition
    }
    // @ts-ignore
    public get detail(): string {
        return this._serviceDefinition.id
    }
    // @ts-ignore
    public get documentation(): string {
        return "Of class " + this._serviceDefinition.className
    }
}