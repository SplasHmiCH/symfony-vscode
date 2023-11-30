"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const EditingUtils_1 = require("../EditingUtils");
class ServiceDocumentationCodeAction extends vscode.CodeAction {
    constructor(document, range, serviceDefinition) {
        super("Include PHPDoc tag for Symfony service", vscode.CodeActionKind.QuickFix);
        let uri = document.uri;
        let position = EditingUtils_1.EditingUtils.getLineStartPosition(document, range.start.line);
        let newText = this._getTextToInsert(document, position, serviceDefinition);
        let edit = new vscode.WorkspaceEdit();
        edit.insert(uri, position, newText);
        this.edit = edit;
    }
    _getTextToInsert(document, position, serviceDefinition) {
        let variableName = "";
        let textLine = document.lineAt(position.line).text;
        let variableMatching = textLine.match(/^[ |\t]*(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/);
        if (variableMatching) {
            variableName = variableMatching[0].trim();
        }
        let indentationSubstring = document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
        let textToInsert = "/** @var \\" + serviceDefinition.className + " " + variableName + " */\n" + indentationSubstring;
        return textToInsert;
    }
}
exports.ServiceDocumentationCodeAction = ServiceDocumentationCodeAction;
//# sourceMappingURL=ServiceDocumentationCodeAction.js.map