"use strict";
/**
 * This module holds the {@link GymieClient} class
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var websocket_1 = require("websocket");
var Requester_1 = require("./Requester");
var Deferred_1 = require("./Deferred");
var Env_1 = require("./Env");
var errors_1 = require("./errors");
var utils_1 = require("./utils");
var GymieClient = /** @class */ (function () {
    function GymieClient() {
        var _this = this;
        this.wsClient = null;
        this.wsConn = null;
        this.sender = function (data) {
            _this.wsConn.sendUTF(utils_1.toStr(data));
        };
        this.onMessage = function (message) {
            _this.requester.incoming.resolve(message.utf8Data);
        };
        this.onError = function (err) {
            var incoming = _this.requester.incoming;
            if (incoming) {
                incoming.reject(new errors_1.ConnectionError(err.message));
            }
        };
        this.onClose = function (code, desc) {
            var incoming = _this.requester.incoming;
            if (incoming) {
                incoming.reject(new errors_1.ConnectionClosed("[" + code + "] " + desc));
            }
        };
        this.wsClient = new websocket_1.client();
        this.requester = new Requester_1["default"](this.sender);
    }
    GymieClient.prototype.connect = function (wsApi) {
        return __awaiter(this, void 0, void 0, function () {
            var wsClient, connect, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wsClient = this.wsClient;
                        connect = new Deferred_1["default"]();
                        wsClient.on('connect', function (conn) { return connect.resolve(conn); });
                        wsClient.on('connectFailed', function (err) { return connect.reject(err); });
                        wsClient.connect(wsApi);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, connect.promise];
                    case 2:
                        _a.wsConn = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        throw new errors_1.ConnectFailed();
                    case 4:
                        this.wsConn.on('message', this.onMessage);
                        this.wsConn.on('error', this.onError);
                        this.wsConn.on('close', this.onClose);
                        return [2 /*return*/];
                }
            });
        });
    };
    GymieClient.prototype.make = function (envId) {
        return __awaiter(this, void 0, void 0, function () {
            var instanceId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.wsConn && this.wsConn.connected)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requester.request({
                                method: 'make',
                                params: { env_id: envId }
                            })];
                    case 1:
                        instanceId = _a.sent();
                        return [2 /*return*/, new Env_1["default"](instanceId, this.requester)];
                    case 2: throw new errors_1.NoConnected();
                }
            });
        });
    };
    GymieClient.prototype.close = function (reasonCode, description) {
        this.wsConn.close(reasonCode, description);
    };
    return GymieClient;
}());
exports["default"] = GymieClient;
