import { client as WebSocketClient } from 'websocket'
import Deferred from './Deferred'
import Env from './Env'

export default class GymieClient { 
  constructor() {}
  make() {
    return new Env('instance_id')
  }
}
