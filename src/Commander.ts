import { Dict } from "./utils"

/**
 * Info sent to the server.
 */
export interface Command {
  method: string
  params: Dict<any>
}

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
export default class Commander {

  /**
   * Environment's id
   */
  instanceId: string = ''

  constructor(instanceId: string) {
    this.instanceId = instanceId
  }

  /**
   * Creates a new command with the environment's id as parameter.
   * @param method API name
   * @param params Parameters for the API method.
   * @returns Command sent to the server.
   */
  make(method: string, params: Dict<any> = {}): Command {
    params.instance_id = this.instanceId
    return { method, params }
  }
}
