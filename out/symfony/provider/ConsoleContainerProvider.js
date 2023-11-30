"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var path = require("path");
var jsonStripComments = require("strip-json-comments");
var ServiceDefinition_1 = require("../ServiceDefinition");
var child_process_1 = require("child_process");
var ComposerJSON_1 = require("../ComposerJSON");
var RouteDefinition_1 = require("../RouteDefinition");
var Parameter_1 = require("../Parameter");
var ConsoleContainerProvider = /** @class */ (function () {
    function ConsoleContainerProvider() {
        this._configuration = vscode.workspace.getConfiguration("symfony-vscode");
        this._composerJson = new ComposerJSON_1.ComposerJSON();
    }
    ConsoleContainerProvider.prototype.canProvideServiceDefinitions = function () {
        return true;
    };
    ConsoleContainerProvider.prototype.canProvideRouteDefinitions = function () {
        return true;
    };
    ConsoleContainerProvider.prototype.canProvideParameters = function () {
        return true;
    };
    ConsoleContainerProvider.prototype.provideServiceDefinitions = function () {
        var _this = this;
        return this._executeCommand(["debug:container", "--show-hidden"], function (obj) {
            var result = [];
            var collection = {};
            if (obj.definitions !== undefined) {
                Object.keys(obj.definitions).forEach(function (key) {
                    collection[key] = (new ServiceDefinition_1.ServiceDefinition(key, obj.definitions[key].class, obj.definitions[key].public, null));
                });
            }
            if (obj.aliases !== undefined) {
                Object.keys(obj.aliases).forEach(function (key) {
                    var alias = obj.aliases[key].service;
                    var className = collection[alias] ? collection[alias].className : null;
                    collection[key] = (new ServiceDefinition_1.ServiceDefinition(key, className, obj.aliases[key].public, alias));
                });
            }
            Object.keys(collection).forEach(function (key) {
                if (!_this._matchServicesFilters(collection[key].id, collection[key].className)) {
                    result.push(collection[key]);
                }
            });
            return result;
        });
    };
    ConsoleContainerProvider.prototype.provideRouteDefinitions = function () {
        var _this = this;
        return this._executeCommand(["debug:router"], function (obj) {
            var result = [];
            Object.keys(obj).forEach(function (key) {
                if (!_this._matchRoutesFilters(key, obj[key].path)) {
                    result.push(new RouteDefinition_1.RouteDefinition(key, obj[key].path, obj[key].method, obj[key].defaults._controller));
                }
            });
            return result;
        });
    };
    ConsoleContainerProvider.prototype.provideParameters = function () {
        var _this = this;
        return this._executeCommand(["debug:container", "--parameters"], function (obj) {
            var result = [];
            Object.keys(obj).forEach(function (key) {
                if (!_this._matchParametersFilters(key)) {
                    result.push(new Parameter_1.Parameter(key, obj[key]));
                }
            });
            return result;
        });
    };
    ConsoleContainerProvider.prototype._executeCommand = function (parameters, cb) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._getConsolePath().then(function (infos) {
                var args = [];
                args.push(infos.consolePath);
                args = args.concat(parameters);
                args.push("--format=json");
                var buffer = "";
                var errorBuffer = "";
                try {
                    var executable = _this._getPHPExecutablePath();
                    var options = { cwd: infos.cwd };
                    var shellExecutable = false;
                    if (shellExecutable = _this._getShellExecutable()) {
                        executable = _this._getShellCommand();
                        options = { shell: shellExecutable };
                    }
                    var process_1 = child_process_1.spawn(executable, args, options);
                    process_1.stdout.on('data', function (data) {
                        buffer += data;
                    });
                    process_1.stderr.on('data', function (data) {
                        errorBuffer += data;
                    });
                    process_1.on('error', function (err) {
                        if (_this._showErrors) {
                            reject(err.message);
                        }
                        else {
                            resolve([]);
                        }
                    });
                    process_1.on('close', function (code) {
                        if (code !== 0) {
                            if (_this._showErrors) {
                                reject(errorBuffer);
                            }
                            else {
                                resolve([]);
                            }
                        }
                        else {
                            try {
                                var obj = JSON.parse(jsonStripComments(buffer));
                                resolve(cb(obj));
                            }
                            catch (e) {
                                if (_this._showErrors) {
                                    reject(e);
                                }
                                else {
                                    resolve([]);
                                }
                            }
                        }
                    });
                }
                catch (e) {
                    if (_this._showErrors) {
                        reject(e);
                    }
                    else {
                        resolve([]);
                    }
                }
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    ConsoleContainerProvider.prototype._getConsolePath = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._composerJson.initialize().then(function (infos) {
                var customConsolePath = _this._configuration.get("consolePath");
                var consolePath = "";
                if (customConsolePath) {
                    consolePath = customConsolePath;
                }
                else {
                    consolePath = "bin/console";
                }
                resolve({
                    consolePath: consolePath,
                    cwd: path.dirname(infos.uri.fsPath)
                });
            }).catch(function (reason) { return reject(reason); });
        });
    };
    ConsoleContainerProvider.prototype._getPHPExecutablePath = function () {
        return this._configuration.get("phpExecutablePath");
    };
    ConsoleContainerProvider.prototype._getShellExecutable = function () {
        return this._configuration.get("shellExecutable");
    };
    ConsoleContainerProvider.prototype._getShellCommand = function () {
        return this._configuration.get("shellCommand");
    };
    ConsoleContainerProvider.prototype._showErrors = function () {
        return this._configuration.get("showConsoleErrors");
    };
    ConsoleContainerProvider.prototype._matchServicesFilters = function (serviceId, serviceClassName) {
        var filters = this._configuration.get("servicesFilters");
        return Object.keys(filters).some(function (filter) {
            if (filters[filter] === "id" && serviceId != null && serviceId.match(new RegExp(filter))) {
                return true;
            }
            else if (filters[filter] === "class" && serviceClassName != null && serviceClassName.match(new RegExp(filter))) {
                return true;
            }
            return false;
        });
    };
    ConsoleContainerProvider.prototype._matchRoutesFilters = function (routeId, routePath) {
        var filters = this._configuration.get("routesFilters");
        return Object.keys(filters).some(function (filter) {
            if (filters[filter] === "id" && routeId != null && routeId.match(new RegExp(filter))) {
                return true;
            }
            else if (filters[filter] === "path" && routePath != null && routePath.match(new RegExp(filter))) {
                return true;
            }
            return false;
        });
    };
    ConsoleContainerProvider.prototype._matchParametersFilters = function (parameterId) {
        var filters = this._configuration.get("parametersFilters");
        return filters.some(function (filter) {
            return parameterId != null && (parameterId.match(new RegExp(filter)) !== null);
        });
    };
    return ConsoleContainerProvider;
}());
exports.ConsoleContainerProvider = ConsoleContainerProvider;
