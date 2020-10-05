type PromiseResolve<T> = (value?: T) => void
type PromiseReject = (reason?: any) => void

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
