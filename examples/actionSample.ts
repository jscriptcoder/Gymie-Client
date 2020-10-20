import Gymie  from '../dist'
import { Continuous, Discrete } from '../dist/Env'
import { 
  ConnectFailed, 
  NoConnected, 
  ConnectionError, 
  ConnectionClosed 
} from '../dist/errors'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'LunarLander-v2'
const { log } = console

;(async () => {
  const gymie = new Gymie()

  try {
    // Connects to the server
    await gymie.connect(wsApi)

    // Instantiates the environment, in this case it's got
    // a continuous state and discrete action space.
    const env = await gymie.make<Continuous, Discrete>(envId)
    const space = await env.actionSpace()
    log('Action Space:', space) // => Action Space: { name: 'Discrete', n: number }

    const initialState = await env.reset()
    log('Initial State:\n', initialState) // => Initial State: number[]

    let step = 0
    let totalReward = 0
    
    // Running loop: runs an episode until `done = true`
    log('---- START episode ----')
    while (true) {

      log(`\nStep: ${++step}`)

      // Samples a random action
      const action = await env.actionSample()
      log('Action:', action)  // => Action: number from [0..n)
      
      // Performs a step on the environment given the action
      const [nextState, reward, done, _] = await env.step(action)
  
      log('Next State:\n', nextState) // => Next State: number[]
      log(`Reward: ${reward}`) // => Next State: number
  
      totalReward += reward
  
      if (done) {
        log('---- END episode ----')
        break
      }
    }
  
    log(`\nEpisode Reward: ${totalReward}\n`)
  
    await env.close()

  } catch(err) {
    switch(true) {
      // This could happen while trying to connect to the server
      case err instanceof ConnectFailed: break

      // There is no connection and we try to instantiate an environment    
      case err instanceof NoConnected: break

      // There was a socket error
      case err instanceof ConnectionError: break

      // Server closed the connection. Code and reason comes in the message
      case err instanceof ConnectionClosed: break
    }
  } finally {
    gymie.close()
  }
})()
