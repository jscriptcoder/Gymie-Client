"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObj = exports.toStr = exports.noop = void 0;
/**
 * Empty function used as default value.
 */
exports.noop = () => { };
/**
 * Converts a JS value to a JSON string.
 * @param obj Object to stringify.
 * @returns JSON string.
 */
exports.toStr = (obj) => JSON.stringify(obj);
/**
 * Converts a JSON string into an object.
 * @param str JSON string to parse.
 * @returns Parsed object.
 */
exports.toObj = (str) => JSON.parse(str);
