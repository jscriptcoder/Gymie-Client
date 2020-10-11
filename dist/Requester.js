"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Deferred_1 = __importDefault(require("./Deferred"));
const utils_1 = require("./utils");
/**
 * The Requester will take care of handling request and
 * data delievery in a one-way communication fashion.
 */
class Requester {
    constructor(sender = utils_1.noop) {
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
    request(data) {
        this.incoming = new Deferred_1.default();
        this.sender(data);
        return this.incoming.promise;
    }
}
exports.default = Requester;
