"use strict";
exports.__esModule = true;
var Commander = /** @class */ (function () {
    function Commander(instanceId) {
        this.instanceId = '';
        this.instanceId = instanceId;
    }
    Commander.prototype.make = function (method, params) {
        if (params === void 0) { params = {}; }
        params.instance_id = this.instanceId;
        return { method: method, params: params };
    };
    return Commander;
}());
exports["default"] = Commander;
