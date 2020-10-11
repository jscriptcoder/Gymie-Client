"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Takes care of creating commands to be sent to the server.
 *
 * Holds the `instance_id` of the current environment, which will be
 * sent along with other parameters in each call.
 *
 * A command consists of:
 * ```ts
 * {
 *   method: 'method_name', // addreses the different API methods exposed by the server
 *   params: {...} // a collection of parameters to be passed to the method API
 * }
 * ```
 */
class Commander {
    constructor(instanceId) {
        /**
         * Environment's id
         */
        this.instanceId = '';
        this.instanceId = instanceId;
    }
    /**
     * Creates a new command with the environment's id as parameter.
     * @param method API name
     * @param params Parameters for the API method.
     * @returns Command sent to the server.
     */
    make(method, params = {}) {
        params.instance_id = this.instanceId;
        return { method, params };
    }
}
exports.default = Commander;
