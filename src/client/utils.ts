export const noop = () => {}

export const stringify = (obj: object) => JSON.stringify(obj)

export const objectify = (str: string): object => JSON.parse(str)
