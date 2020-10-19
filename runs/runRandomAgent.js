const { argv } = require('yargs')
const Gymie  = require('../dist').default
const RandomAgent  = require('./RandomAgent')

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'LunarLander-v2'

function mean(list) {
  return list.reduce((acc, total) => acc + total , 0) / list.length
}

(async () => {
  const gymie = new Gymie()
  await gymie.connect(wsApi)

  const env = await gymie.make(envId)
  const space = await env.actionSpace()
  const agent = new RandomAgent(space.n)

  const episodes = argv.episodes || 10000
  const rewards = []

  console.log('---')
  console.log(`Running ${episodes} episodes on Node platform...`)

  const start = new Date().getTime()

  for (let i = 0; i < episodes; i++) {
    await env.reset()
    let totalReward = 0
    while (true) {
      const action = agent.act()
      const [obs, reward, done, info] = await env.step(action)
      totalReward += reward
      if (done) {
        rewards.push(totalReward)
        break
      }
    }
  }

  await env.close()

  const end = new Date().getTime()
  console.log(`It took ${(end - start)/1000} seconds to finish.`)
  console.log(`Average total reward: ${mean(rewards).toFixed(2)}`)
  console.log('---')

  gymie.close()

})()
