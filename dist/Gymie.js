"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = require("websocket");
const Requester_1 = __importDefault(require("./Requester"));
const Deferred_1 = __importDefault(require("./Deferred"));
const Env_1 = __importDefault(require("./Env"));
const errors_1 = require("./errors");
const utils_1 = require("./utils");
class Gymie {
    constructor() {
        this.wsClient = null;
        this.wsConn = null;
        this.sender = (data) => {
            this.wsConn.sendUTF(utils_1.toStr(data));
        };
        this.onMessage = (message) => {
            this.requester.incoming.resolve(message.utf8Data);
        };
        this.onError = (err) => {
            const { incoming } = this.requester;
            if (incoming) {
                incoming.reject(new errors_1.ConnectionError(err.message));
            }
        };
        this.onClose = (code, desc) => {
            const { incoming } = this.requester;
            if (incoming) {
                incoming.reject(new errors_1.ConnectionClosed(`[${code}] ${desc}`));
            }
        };
        this.wsClient = new websocket_1.client();
        this.requester = new Requester_1.default(this.sender);
    }
    async connect(wsApi) {
        const { wsClient } = this;
        const connect = new Deferred_1.default();
        wsClient.on('connect', conn => connect.resolve(conn));
        wsClient.on('connectFailed', err => connect.reject(err));
        wsClient.connect(wsApi);
        try {
            this.wsConn = await connect.promise;
        }
        catch (err) {
            throw new errors_1.ConnectFailed();
        }
        this.wsConn.on('message', this.onMessage);
        this.wsConn.on('error', this.onError);
        this.wsConn.on('close', this.onClose);
    }
    async make(envId) {
        if (this.wsConn && this.wsConn.connected) {
            const instanceId = await this.requester.request({
                method: 'make',
                params: { env_id: envId }
            });
            return new Env_1.default(instanceId, this.requester);
        }
        else {
            throw new errors_1.NoConnected();
        }
    }
    close(reasonCode, description) {
        this.wsConn.close(reasonCode, description);
    }
}
exports.default = Gymie;
