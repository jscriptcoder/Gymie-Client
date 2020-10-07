export type Dict<T> = {[key: string]: T}

export type State = number[]
export type Action = number | number[]
export type Reward = number
export type Done = boolean
export type Info = Dict<any>
export type Step = [State, Reward, Done, Info]

export interface Space { name: string }
export interface Discrete extends Space { n: number }
export interface Box extends Space {
  shape: number[],
  low: number[],
  high: number[],
}
