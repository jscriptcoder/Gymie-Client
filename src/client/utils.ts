export type Dict<T> = {[key: string]: T}

export const noop = () => {}

export const toStr = (obj: object): string => JSON.stringify(obj)

export const toObj = <T>(str: string): T => JSON.parse(str)
