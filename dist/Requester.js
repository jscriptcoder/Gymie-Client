"use strict";
/**
 * This module holds the {@link Requester} class
 */
exports.__esModule = true;
var Deferred_1 = require("./Deferred");
var utils_1 = require("./utils");
/**
 * The Requester will take care of handling request and
 * data delievery in a one-way communication fashion.
 */
var Requester = /** @class */ (function () {
    function Requester(sender) {
        if (sender === void 0) { sender = utils_1.noop; }
        /**
         * Promise with the incoming message.
         */
        this.incoming = null;
        /**
         * Wrapper function for the underlying logic to send data.
         */
        this.sender = null;
        this.sender = sender;
    }
    /**
     * Sends a request to the server
     * @param data Data to be sent
     * @returns Promise holding the response data from the server.
     */
    Requester.prototype.request = function (data) {
        this.incoming = new Deferred_1["default"]();
        this.sender(data);
        return this.incoming.promise;
    };
    return Requester;
}());
exports["default"] = Requester;
