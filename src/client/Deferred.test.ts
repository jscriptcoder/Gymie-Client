import test from 'tape'
import Deferred from './Deferred'

test('Deferred#resolve', t => {
  const deferred = new Deferred()

  deferred.promise
    .then(value => {
      t.equal(value, 'success', 'Promise resolved with the right value')
    })
    .catch(() => {
      t.fail('Failed to resolve promise')
    })
    .finally(() => {
      t.end()
    })
  
  deferred.resolve('success')
})

test('Deferred#reject', t => {
  const deferred = new Deferred()

  deferred.promise
    .then(() => {
      t.fail('Failed to reject promise')
    })
    .catch(err => {
      t.equal(err, 'fail', 'Promise rejected with the right error')
    })
    .finally(() => {
      t.end()
    })
  
  deferred.reject('fail')
})
