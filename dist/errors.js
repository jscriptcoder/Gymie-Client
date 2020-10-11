"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionError = exports.ConnectionClosed = exports.NoConnected = exports.ConnectFailed = void 0;
/**
 * ConnectFailed Exception. See
 * [WebSocket - connectFailed event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md#connectfailed}
 */
class ConnectFailed extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectFailed';
    }
}
exports.ConnectFailed = ConnectFailed;
/**
 * Will happens if we try to instantiate an environment where
 * there isn't yet an established connection.
 * NoConnected Exception
 */
class NoConnected extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoConnected';
    }
}
exports.NoConnected = NoConnected;
/**
 * ConnectionClosed Exception. See
 * [WebSocket - close event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#close}
 */
class ConnectionClosed extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionClosed';
    }
}
exports.ConnectionClosed = ConnectionClosed;
/**
 * ConnectionError Exception
 * [WebSocket - error event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error}
 */
class ConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConnectionError';
    }
}
exports.ConnectionError = ConnectionError;
