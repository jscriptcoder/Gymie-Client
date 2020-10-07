"use strict";
exports.__esModule = true;
exports.toObj = exports.toStr = exports.noop = void 0;
exports.noop = function () { };
exports.toStr = function (obj) { return JSON.stringify(obj); };
exports.toObj = function (str) { return JSON.parse(str); };
