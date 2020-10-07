"use strict";
exports.__esModule = true;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.resolve = null;
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
