import * as vscode from "vscode"
import { Parameter } from "../../../symfony/Parameter";

export class ParameterCompletionItem extends vscode.CompletionItem {
    public parameter: Parameter

    constructor(parameter: Parameter) {
        super(parameter.name, vscode.CompletionItemKind.Property)
        this.parameter = parameter
    }
    // @ts-ignore
    public get detail(): string {
        return this.parameter.name
    }
    // @ts-ignore
    public get documentation(): string {
        return "Of value : " + this.parameter.value
    }
}