import test from 'tape'
import GymieClient from '../src/client/GymieClient'

const wsApi = 'http://0.0.0.0:5000/gym'

test('GymieClient#connect - Server down', async t => {
  const gymie = new GymieClient()

  try {
    await gymie.connect(wsApi)
    t.fail('Gymie should not be able to connect')
  } catch (err) {
    t.equal(err.name, 'ConnectFailed', 'Exception is `ConnectFailed`')
    t.pass('Gymie did not connect because server is down')
  }

  t.end()
})
