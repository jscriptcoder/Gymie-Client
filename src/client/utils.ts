export const noop = () => {}

export const toStr = (obj: object) => JSON.stringify(obj)

export const toObj = <T>(str: string): T => JSON.parse(str)
