import Deferred from './Deferred'
import { noop } from './utils'

type Sender<T> = (value?: T) => void

export default class Requester<S, R> {

  incoming: Deferred<R> = null
  sender: Sender<S> = null

  constructor(sender: Sender<S> = noop) {
    this.sender = sender
  }

  request(data: S): Promise<R> {
    this.incoming = new Deferred<R>()
    this.sender(data)
    return this.incoming.promise
  }
}
