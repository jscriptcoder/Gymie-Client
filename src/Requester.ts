import Deferred from './Deferred'
import { noop } from './utils'

/**
 * Sender callback.
 * @typeParam T Type of data to send.
 */
type Sender<T> = (value: T) => void

/**
 * The Requester will take care of handling request and 
 * data delievery in a one-way communication fashion.
 * @typeParam S Type of data to send.
 * @typeParam R Type of data to receive.
 */
export default class Requester<S, R> {

  /**
   * Deferred promise with the incoming message.
   */
  incoming: Deferred<R> = null

  /**
   * Wrapper function for the underlying logic to send data.
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
