import test from 'tape'
import Requester from './Requester'

test('Requester#request - Incoming resolved', t => {
  const requester = new Requester(value => {
    t.equal(value, 'data_to_send', 'Right data is sent')
  })

  requester
    .request('data_to_send')
    .then(value => {
      t.equal(value, 'success', 'Incomming message resolved with the right value')
    })
    .catch(() => {
      t.fail('Failed to resolve incoming message')
    })
    .finally(() => {
      t.end()
    })

  requester.incoming.resolve('success')
})

test('Requester#request - Incoming rejected', t => {
  const requester = new Requester(value => {
    t.equal(value, 'data_to_send', 'Right data is sent')
  })

  requester
    .request('data_to_send')
    .then(() => {
      t.fail('Failed to reject incoming message')
    })
    .catch(err => {
      t.equal(err, 'fail', 'Incoming message rejected with the right error')
    })
    .finally(() => {
      t.end()
    })

  requester.incoming.reject('fail')
})
