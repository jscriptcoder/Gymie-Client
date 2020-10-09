"use strict";
/**
 * Collection of utilities.
 */
exports.__esModule = true;
exports.toObj = exports.toStr = exports.noop = void 0;
/**
 * Empty function used as default value.
 */
exports.noop = function () { };
/**
 * Converts a JS value to a JSON string.
 * @param obj Object to stringify.
 * @returns JSON string.
 */
exports.toStr = function (obj) { return JSON.stringify(obj); };
/**
 * Converts a JSON string into an object.
 * @param str JSON string to parse.
 * @returns Parsed object.
 */
exports.toObj = function (str) { return JSON.parse(str); };
