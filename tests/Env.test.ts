import test from 'tape'
import GymieClient from '../src/client/GymieClient'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'CartPole-v1'

test('Env#reset', async t => {
  const gymie = new GymieClient()

  await gymie.connect(wsApi)

  const env = await gymie.make(envId)
  const state = await env.reset() as number[]
  const isState = Array.isArray(state) && state.length > 0

  t.ok(isState, 'Reset method returned a valid state')

  gymie.close()

  t.end()
})

test('Env#step - Valid action', async t => {
  const gymie = new GymieClient()

  await gymie.connect(wsApi)

  const env = await gymie.make(envId)
  await env.reset()
  const [obs, reward, done, info] = await env.step(0)

  const isState = Array.isArray(obs) && obs.length > 0
  const isNumber = typeof reward === 'number'
  const isBool = typeof done === 'boolean'
  const isObj = info && typeof info === 'object'

  t.ok(isState, 'Step method returned a valid next step')
  t.ok(isNumber, 'Step method returned a valid reward')
  t.ok(isBool, 'Step method returned a done flag')
  t.ok(isObj, 'Step method returned a info object')

  gymie.close()

  t.end()
})

test('Env#step - Invalid action', async t => {
  const gymie = new GymieClient()

  await gymie.connect(wsApi)
  const env = await gymie.make(envId)
  await env.reset()

  try {
    await env.step(-123)
  } catch(err) {
    t.equal(err.name, 'ConnectionClosed', 'Exception is `ConnectionClosed`')
    t.pass(err.message)
  }


  gymie.close()

  t.end()
})
