import Gymie  from '../dist'
import { Continuous, Discrete } from '../dist/Env'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'LunarLander-v2'

;(async () => {
  const gymie = new Gymie()
  await gymie.connect(wsApi)

  const env = await gymie.make<Continuous, Discrete>(envId)
  const space = await env.actionSpace()
  console.log('Action Space:', space)

  const initialState = await env.reset()
  console.log('Initial State:\n', initialState)

  let totalReward = 0
  
  console.log('Running episode...')
  while (true) {
    const action = await env.actionSample()
    console.log('Action:', action)

    const [nextState, reward, done, _] = await env.step(action)

    console.log('Next State:\n', nextState)
    console.log('Reward:', reward)

    totalReward += reward

    if (done) {
      console.log('Done')
      break
    }

    console.log('---')
  }

  console.log('Episode Reward:', totalReward)

  await env.close()
  gymie.close()
})()
