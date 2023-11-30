"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var fs = require("graceful-fs");
var stripJsonComments = require("strip-json-comments");
var ComposerJSON = /** @class */ (function () {
    function ComposerJSON() {
    }
    ComposerJSON.prototype.initialize = function () {
        return new Promise(function (resolve, reject) {
            if (vscode.workspace.workspaceFolders === undefined) {
                reject("No workspace folder opened");
            }
            vscode.workspace.findFiles("**/composer.json").then(function (uris) {
                if (uris.length == 0) {
                    reject("No composer.json file detected in the current workspace");
                }
                else {
                    uris.forEach(function (uri) {
                        var composerObj = JSON.parse(stripJsonComments(fs.readFileSync(uri.fsPath).toString()));
                        if (composerObj.require !== undefined) {
                            Object.keys(composerObj.require).forEach(function (key) {
                                if (key === "symfony/symfony" || key == "symfony/framework-bundle" || key === "symfony/flex") {
                                    resolve({
                                        symfonyVersion: parseInt(composerObj.require[key].match(/\d/)),
                                        uri: uri
                                    });
                                }
                            });
                        }
                    });
                    reject("No composer.json file wih Symfony as dependency detected");
                }
            });
        });
    };
    return ComposerJSON;
}());
exports.ComposerJSON = ComposerJSON;
