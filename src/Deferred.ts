/**
 * `resolved()` method
 */
type PromiseResolve<T> = (value?: T) => void

/**
 * `reject()` method
 */
type PromiseReject = (reason?: any) => void

/**
 * Returns an object with a promise on the way and two methods, 
 * `resolve()` and `reject()`, to change its state.
 * [Deferred object]{@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred}
 * @typeParam T Data wrapped in the promise.
 */
export default class Deferred<T> {
  
  /**
   * Changes the state of the promise to `resolved`
   * [Promise.resolve()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve}
   */
  resolve: PromiseResolve<T> = null

  /**
   * Changes the state of the promise to `rejected`
   * [Promise.reject()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject}
   */
  reject: PromiseReject = null
  promise: Promise<T> = null

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
