import { client as WebSocketClient} from 'websocket'
import { host, port } from './config'
import Deferred from './Deferred'

async function test() {
  const connect = new Deferred()
  const client = new WebSocketClient()
  
  client.on('connect', connection => connect.resolve(connection))
  client.on('connectFailed', err => connect.reject(err))
  
  client.connect(`ws://${host}:${port}/gym`)
  
  try {
    const connection = await connect.promise

    connection.on('message', message => console.log(message.utf8Data))
    connection.on('error', error => console.log('error', error))
    connection.on('close', (reasonCode, description) => console.log('closing', reasonCode, description))
  
    const data = JSON.stringify({
      method: 'makae',
      params: {
        env_id: 'LunarLander-v2',
      }
    })
  
    connection.sendUTF(data)
  } catch (err) {
    console.log(err)
  }
}

test()
