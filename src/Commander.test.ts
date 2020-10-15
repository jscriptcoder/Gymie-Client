import test from 'tape'
import Commander from './Commander'

test('Commander#make', t => {
  const commander = new Commander('instance_id')
  const command = commander.make('myMethod', {
    param1: 'test',
    param2: true
  })

  t.deepEqual(command, {
    method: 'myMethod',
    params: {
      instance_id: 'instance_id',
      param1: 'test',
      param2: true
    }
  }, 'Command successfully created')

  t.end()
})
