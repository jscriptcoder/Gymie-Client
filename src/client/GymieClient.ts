import { 
  client as WebSocketClient, 
  connection, 
  IMessage, 
} from 'websocket'

import Requester from './Requester'
import Deferred from './Deferred'
import Env from './Env'
import { Command } from './Commander'
import { ConnectFailed, NoConnected } from './errors'
import { toStr } from './utils'
import { Space } from './types'

export type GymieRequester = Requester<Command, string>

export default class GymieClient { 

  requester: GymieRequester
  wsClient: WebSocketClient = null
  wsConn: connection = null

  sender = (data: Command) => {
    this.wsConn.sendUTF(toStr(data))
  }

  onMessage = (message: IMessage) => {
    this.requester.incoming.resolve(message.utf8Data)
  }

  constructor() {
    this.wsClient = new WebSocketClient()
    this.requester = new Requester<Command, string>(this.sender)
  }

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
  }

  async make<O extends Space, A extends Space>(envId: string): Promise<Env<O, A>> {
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

  close(reasonCode?: number, description?: string): void {
    this.wsConn.close(reasonCode, description)
  }
}
