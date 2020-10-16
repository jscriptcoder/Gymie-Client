/**
 * Compilation of utility functions.
 */

/**
 * Dictionary-like
 * @typeParam T Data type held by the dictionary.
 */
export type Dict<T> = {[key: string]: T}

/**
 * Empty function used as default value.
 */
export const noop = () => {}

/**
 * Converts a JS value to a JSON string.
 * @param obj Object to stringify.
 * @returns JSON string.
 */
export const toStr = (obj: object): string => JSON.stringify(obj)

/**
 * Converts a JSON string into a JS value (literal or object).
 * @param str JSON string to parse.
 * @returns Parsed value.
 */
export const toValue = <T>(str: string): T => JSON.parse(str)
