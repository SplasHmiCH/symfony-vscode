"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("graceful-fs");
const stripJsonComments = require("strip-json-comments");
class ComposerJSON {
    initialize() {
        return new Promise((resolve, reject) => {
            if (vscode.workspace.workspaceFolders === undefined) {
                reject("No workspace folder opened");
            }
            vscode.workspace.findFiles("**/composer.json").then(uris => {
                if (uris.length == 0) {
                    reject("No composer.json file detected in the current workspace");
                }
                else {
                    uris.forEach(uri => {
                        let composerObj = JSON.parse(stripJsonComments(fs.readFileSync(uri.fsPath).toString()));
                        if (composerObj.require !== undefined) {
                            Object.keys(composerObj.require).forEach(key => {
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
    }
}
exports.ComposerJSON = ComposerJSON;
//# sourceMappingURL=ComposerJSON.js.map