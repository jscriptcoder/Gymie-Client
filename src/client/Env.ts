import { GymieRequester } from './GymieClient'
import Commander from './Commander'
import { Dict, toObj } from './utils'
import { NoConnected } from './errors'

export interface Space { name: string }

export interface Discrete extends Space { 
  name: 'Discrete'
  n: number 
}

export interface Continuous extends Space {
  name: 'Box' // class name from Python
  shape: number[]
  low: number[]
  high: number[]
}

export type State<T> = T extends Continuous ? number[] : number
export type Action<T> = T extends Continuous ? number[] : number
export type Reward = number
export type Done = boolean
export type Info = Dict<any>
export type Step<T> = [State<T>, Reward, Done, Info]

export default class Env<O extends Space, A extends Space> {

  commander: Commander = null
  requester: GymieRequester = null
  
  constructor(instanceId: string, requester: GymieRequester) {
    this.commander = new Commander(instanceId)
    this.requester = requester
  }

  async step(action: Action<A>): Promise<Step<O>> {
    const cmd = this.commander.make('step', { action })
    const strStep = await this.requester.request(cmd)
    return toObj<Step<O>>(strStep)
  }

  async reset(): Promise<State<O>> {
    const cmd = this.commander.make('reset')
    const strState = await this.requester.request(cmd)
    return toObj<State<O>>(strState)
  }
  
  async observation_space(): Promise<O> {
    const cmd = this.commander.make('observation_space')
    const strObsSpace = await this.requester.request(cmd)
    return toObj<O>(strObsSpace)
  }

  async action_space(): Promise<A> {
    const cmd = this.commander.make('action_space')
    const strActSpace = await this.requester.request(cmd)
    return toObj<A>(strActSpace)
  }

  async action_sample(): Promise<Action<A>> {
    const cmd = this.commander.make('action_sample')
    const strAction = await this.requester.request(cmd)
    return toObj<Action<A>>(strAction)
  }

  async close(): Promise<boolean> {
    const cmd = this.commander.make('close')
    const resp = await this.requester.request(cmd)
    return toObj<boolean>(resp)
  }
  
}
