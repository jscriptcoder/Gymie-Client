"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an object with a promise on the way and two methods,
 * `resolve()` and `reject()`, to change its state.
 * [Deferred object]{@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred}
 * @typeParam T Data returned by the promise
 */
class Deferred {
    constructor() {
        /**
         * Changes the state of the promise to `resolved`
         * [Promise.resolve()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve}
         */
        this.resolve = null;
        /**
         * Changes the state of the promise to `rejected`
         * [Promise.reject()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject}
         */
        this.reject = null;
        this.promise = null;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
exports.default = Deferred;
