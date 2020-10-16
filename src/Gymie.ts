import { 
  client as WebSocketClient, 
  connection, 
  IMessage, 
} from 'websocket'

import Requester from './Requester'
import Deferred from './Deferred'
import Env, { Space } from './Env'
import { Command } from './Commander'
import { 
  ConnectFailed, 
  NoConnected, 
  ConnectionClosed, 
  ConnectionError 
} from './errors'
import { toStr } from './utils'

/**
 * WebSocket client that consumes an API wrapping {@link https://github.com/openai/gym OpenAI Gym} 
 * or gym-like environments such as {@link https://github.com/openai/retro Gym Retro} 
 * or {@link https://github.com/Unity-Technologies/ml-agents Unity ML-Agents}. Currently the best server is
 * its counterpart {@link https://github.com/jscriptcoder/Gymie-Server Gymie-Server} 😉
 */
export default class Gymie { 

  requester: Requester<Command, string>
  wsClient: WebSocketClient = null
  wsConn: connection = null

  /**
   * Callback function wrapping the socket's sending mechanism.
   * See {@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#sendutfstring WebSocketConnection#sendUTF}
   * @param cmd Command to be sent to the server.
   */
  sender = (cmd: Command) => {
    this.wsConn.sendUTF(toStr(cmd))
  }

  /**
   * Callback function for `message` event. Resolves the promise of the incoming message.
   * See {@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#message WebSocketConnection.onmessage}
   * @param message Message received from the server (plus type).
   */
  onMessage = (message: IMessage) => {
    this.requester.incoming.resolve(message.utf8Data)
  }

  /**
   * Callback function for `error` event. Rejects the promise of the incoming message with {@link ConnectionError}.
   * See {@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error WebSocketConnection.onerror}
   * @param err Thrown exception.
   */
  onError = (err: Error) => {
    const { incoming } = this.requester
    if (incoming) {
      incoming.reject(new ConnectionError(err.message))
    }
  }

  /**
   * Callback function for `close` event. Rejects the promise of the incoming message with [ConnectionClosed].
   * @see {@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#closereasoncode-description WebSocketConnection.onclose}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes Status Codes}
   * @param code Close code sent by the server.
   * @param desc Reason why the server closed the connection. 
   */
  onClose = (code: number, desc: string) => {
    const { incoming } = this.requester
    if (incoming) {
      incoming.reject(new ConnectionClosed(`[${code}] ${desc}`))
    }
  }

  constructor() {
    this.wsClient = new WebSocketClient()
    this.requester = new Requester<Command, string>(this.sender)
  }

  /**
   * Asynchronous method that establishes connection with the server.
   * @param wsApi Host and port to connect to.
   * @throws {ConnectFailed}
   * @example 
   *   try {
   *     await gymie.connect('ws://0.0.0.0:5000')
   *   } catch(err) {
   *     // err instanceof ConnectFailed
   *   }
   */
  async connect(wsApi: string): Promise<void> {
    const { wsClient } = this
    const connect = new Deferred<connection>()
    
    wsClient.on('connect', conn => connect.resolve(conn))
    wsClient.on('connectFailed', err => connect.reject(err))
    wsClient.connect(wsApi)

    try {
      this.wsConn = await connect.promise
    } catch(err) {
      throw new ConnectFailed()
    }

    this.wsConn.on('message', this.onMessage)
    this.wsConn.on('error', this.onError)
    this.wsConn.on('close', this.onClose)
  }

  /**
   * Instantiates an environment, returning a promise holding the wrapper [Env]
   * @param envId 
   * @param [seed]
   * @throws {NoConnected}
   * @example
   *   try {
   *     const env = await gymie.make<Continuous, Discrete>('LunarLander-v2')
   *   } catch (err) {
   *     // err instanceof NoConnected
   *   }
   *   
   */
  async make<O extends Space, A extends Space>(envId: string, seed?: number): Promise<Env<O, A>> {
    if (this.wsConn && this.wsConn.connected) {
      const instanceId = await this.requester.request({
        method: 'make',
        params: { env_id: envId }
      })
      return new Env<O, A>(instanceId, this.requester)
    } else {
      throw new NoConnected()
    }
  }

  /**
   * 
   * @param reasonCode 
   * @param description 
   */
  close(reasonCode?: number, description?: string): void {
    this.wsConn.close(reasonCode, description)
  }
}
