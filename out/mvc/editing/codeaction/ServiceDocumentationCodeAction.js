"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var EditingUtils_1 = require("../EditingUtils");
var ServiceDocumentationCodeAction = /** @class */ (function (_super) {
    __extends(ServiceDocumentationCodeAction, _super);
    function ServiceDocumentationCodeAction(document, range, serviceDefinition) {
        var _this = _super.call(this, "Include PHPDoc tag for Symfony service", vscode.CodeActionKind.QuickFix) || this;
        var uri = document.uri;
        var position = EditingUtils_1.EditingUtils.getLineStartPosition(document, range.start.line);
        var newText = _this._getTextToInsert(document, position, serviceDefinition);
        var edit = new vscode.WorkspaceEdit();
        edit.insert(uri, position, newText);
        _this.edit = edit;
        return _this;
    }
    ServiceDocumentationCodeAction.prototype._getTextToInsert = function (document, position, serviceDefinition) {
        var variableName = "";
        var textLine = document.lineAt(position.line).text;
        var variableMatching = textLine.match(/^[ |\t]*(\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/);
        if (variableMatching) {
            variableName = variableMatching[0].trim();
        }
        var indentationSubstring = document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
        var textToInsert = "/** @var \\" + serviceDefinition.className + " " + variableName + " */\n" + indentationSubstring;
        return textToInsert;
    };
    return ServiceDocumentationCodeAction;
}(vscode.CodeAction));
exports.ServiceDocumentationCodeAction = ServiceDocumentationCodeAction;
