"use strict";
exports.__esModule = true;
var Deferred_1 = require("./Deferred");
var utils_1 = require("./utils");
var Requester = /** @class */ (function () {
    function Requester(sender) {
        if (sender === void 0) { sender = utils_1.noop; }
        this.incoming = null;
        this.sender = null;
        this.sender = sender;
    }
    Requester.prototype.request = function (data) {
        this.incoming = new Deferred_1["default"]();
        this.sender(data);
        return this.incoming.promise;
    };
    return Requester;
}());
exports["default"] = Requester;
