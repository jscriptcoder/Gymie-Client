import { Dict, RequestData } from "./types";

export type Dict<T> = {[key: string]: T}

export const noop = () => {}

export interface Command {
  method: string
  params: Dict<any>
}

export function makeCommand(method: string, params: Dict<any> = {}): Command {
  return { method, params }
}
