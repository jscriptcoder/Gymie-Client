import test from 'tape'
import Gymie from './Gymie'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'CartPole-v1'

test('Gymie#connect - Server running', async t => {
  const gymie = new Gymie()

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

test('Gymie#close', async t => {
  const gymie = new Gymie()

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

test('Gymie#make', async t => {
  const gymie = new Gymie()

  try {
    await gymie.connect(wsApi)
    const env = await gymie.make(envId)
    const { instanceId } = env.commander
    const isEnv = typeof instanceId === 'string' && instanceId.length > 0
    t.ok(isEnv, 'Environment successfully instantiated')
  } catch (err) {
    t.fail('Gymie failed to connect')
  } finally {
    gymie.close()
  }

  t.end()
})
