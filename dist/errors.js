"use strict";
/**
 * Collection of custom errors
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ConnectionError = exports.ConnectionClosed = exports.NoConnected = exports.ConnectFailed = void 0;
/**
 * ConnectFailed Exception. See
 * [WebSocket - connectFailed event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md#connectfailed}
 */
var ConnectFailed = /** @class */ (function (_super) {
    __extends(ConnectFailed, _super);
    function ConnectFailed(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ConnectFailed';
        return _this;
    }
    return ConnectFailed;
}(Error));
exports.ConnectFailed = ConnectFailed;
/**
 * Will happens if we try to instantiate an environment where
 * there isn't yet an established connection.
 * NoConnected Exception
 */
var NoConnected = /** @class */ (function (_super) {
    __extends(NoConnected, _super);
    function NoConnected(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'NoConnected';
        return _this;
    }
    return NoConnected;
}(Error));
exports.NoConnected = NoConnected;
/**
 * ConnectionClosed Exception. See
 * [WebSocket - close event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#close}
 */
var ConnectionClosed = /** @class */ (function (_super) {
    __extends(ConnectionClosed, _super);
    function ConnectionClosed(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ConnectionClosed';
        return _this;
    }
    return ConnectionClosed;
}(Error));
exports.ConnectionClosed = ConnectionClosed;
/**
 * ConnectionError Exception
 * [WebSocket - error event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error}
 */
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ConnectionError';
        return _this;
    }
    return ConnectionError;
}(Error));
exports.ConnectionError = ConnectionError;
