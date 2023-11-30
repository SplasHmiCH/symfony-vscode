"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var EditingUtils = /** @class */ (function () {
    function EditingUtils() {
    }
    EditingUtils.getWordRange = function (document, position) {
        var beginPosition = position.with();
        var endPosition = position.with();
        while (document.getText(new vscode.Range(beginPosition.translate(0, -1), beginPosition)).match(/[A-Za-z0-9_.\\~]/)) {
            beginPosition = beginPosition.translate(0, -1);
        }
        while (document.getText(new vscode.Range(endPosition.translate(0, 1), endPosition.translate(0, 2))).match(/[A-Za-z0-9_.\\~]/)) {
            endPosition = endPosition.translate(0, 1);
        }
        return new vscode.Range(beginPosition, endPosition.translate(0, 1));
    };
    EditingUtils.getLineStartPosition = function (document, line) {
        var blanksCharacters = [" ", "\t"];
        var currentPosition = new vscode.Position(line, 0);
        while (blanksCharacters.indexOf(document.getText(new vscode.Range(currentPosition, currentPosition.translate(0, 1)))) !== -1) {
            currentPosition = currentPosition.translate(0, 1);
            if (!document.validatePosition(currentPosition)) {
                return currentPosition;
            }
        }
        return currentPosition;
    };
    return EditingUtils;
}());
exports.EditingUtils = EditingUtils;
