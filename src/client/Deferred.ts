type PromiseResolve<T> = (value?: T) => void
type PromiseReject = (reason?: any) => void

/**
 * Returns an object with a promise on the way and two methods, 
 * `resolve()` and `reject()`, to change its state.
 * [Deferred object]{@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred}
 */
export default class Deferred<T> {
  
  resolve: PromiseResolve<T> = null
  reject: PromiseReject = null
  promise: Promise<T> = null

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
