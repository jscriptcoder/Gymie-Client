import Deferred from './Deferred'
import { noop } from './utils'

type Sender<T> = (value?: T) => void

/**
 * The Requester will take care of handling request and 
 * data delievery in a one-way communication fashion.
 */
export default class Requester<S, R> {

  /**
   * Promise with the incoming message.
   */
  incoming: Deferred<R> = null

  /**
   * Wrapper function for the underlying sending data logic.
   */
  sender: Sender<S> = null

  constructor(sender: Sender<S> = noop) {
    this.sender = sender
  }

  /**
   * Sends a request to the server
   * @param data Data to be sent
   * @returns Promise holding the response data from the server.
   */
  request(data: S): Promise<R> {
    this.incoming = new Deferred<R>()
    this.sender(data)
    return this.incoming.promise
  }
}
