"use strict";
/**
 * This module holds the {@link Deferred} class
 */
exports.__esModule = true;
/**
 * Returns an object with a promise on the way and two methods,
 * `resolve()` and `reject()`, to change its state.
 * [Deferred object]{@link https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred}
 * @typeParam T Data returned by the promise
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
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
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
exports["default"] = Deferred;
