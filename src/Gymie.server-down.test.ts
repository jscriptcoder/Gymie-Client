import test from 'tape'
import Gymie from './Gymie'

const wsApi = 'http://0.0.0.0:5000/gym'

test('Gymie#connect - Server down', async t => {
  const gymie = new Gymie()

  try {
    await gymie.connect(wsApi)
    t.fail('Gymie should not be able to connect')
  } catch (err) {
    t.equal(err.name, 'ConnectFailed', 'Exception is `ConnectFailed`')
    t.pass('Gymie did not connect because server is down')
  }

  t.end()
})
