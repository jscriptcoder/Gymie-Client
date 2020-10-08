import test from 'tape'
import GymieClient from '../src/client/GymieClient'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'CartPole-v1'

test('GymieClient#connect - Server running', async t => {
  const gymie = new GymieClient()

  try {
    await gymie.connect(wsApi)
    t.pass('Gymie connected successfully')
  } catch (err) {
    t.fail('Gymie failed to connect')
  } finally {
    gymie.close()
  }

  t.end()
})

test('GymieClient#close', async t => {
  const gymie = new GymieClient()

  try {
    await gymie.connect(wsApi)
    t.ok(gymie.wsConn.connected, 'Gymie is connected')
  } catch (err) {
    t.fail('Gymie failed to connect')
  } finally {
    gymie.close()
    t.notOk(gymie.wsConn.connected, 'After closing, Gymie is no longer connected')
  }

  t.end()
})

test('GymieClient#make', async t => {
  const gymie = new GymieClient()

  try {
    await gymie.connect(wsApi)
    const env = await gymie.make(envId)
    const { instanceId } = env.commander
    const isEnv = typeof instanceId === 'string' && instanceId.length > 0
    t.ok(isEnv, 'Environment instantiated successfully')
  } catch (err) {
    t.fail('Gymie failed to connect')
  } finally {
    gymie.close()
  }

  t.end()
})
