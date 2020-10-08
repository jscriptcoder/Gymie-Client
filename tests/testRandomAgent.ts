import GymieClient from '../src/client/GymieClient'
import { Continuous, Discrete } from '../src/client/Env'
import { Dict } from '../src/client/utils'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'LunarLander-v2'

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random()*(max - min) + min)
}

(async () => {
  const gymie = new GymieClient()
  await gymie.connect(wsApi)

  const env = await gymie.make<Continuous, Discrete>(envId)
  const space = await env.action_space()

  const nActions = space.n
  const episodes = 1000

  console.log('---')
  console.log(`Running ${episodes} episodes in Javascript...`)

  const start = new Date().getTime()

  let i = episodes

  await (async function forLoop() {

    await env.reset()
    let totalReward = 0

    await (async function whileLoop() {
      const action = randomInt(0, nActions)
      const [obs, reward, done, info] = await env.step(action)
      totalReward += reward

      if (done) return
      await whileLoop()
    })()


    if (--i === 0) return
    await forLoop()
  })()

  await env.close()

  const end = new Date().getTime()
  console.log(`It took ${(end - start)/1000} seconds to finish.`)
  console.log('---')

  gymie.close()

})()
