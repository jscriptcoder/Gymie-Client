import { GymieRequester } from './GymieClient'
import Commander from './Commander'
import { Dict, toObj } from './utils'

export type State = number | number[]
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

export default class Env<O extends Space, A extends Space> {

  commander: Commander = null
  requester: GymieRequester = null
  
  constructor(instanceId: string, requester: GymieRequester) {
    this.commander = new Commander(instanceId)
    this.requester = requester
  }

  async step(action: Action): Promise<Step> {
    const cmd = this.commander.make('step', { action })
    const strStep = await this.requester.request(cmd)
    return toObj<Step>(strStep)
  }

  async reset(): Promise<State> {
    const cmd = this.commander.make('reset')
    const strState = await this.requester.request(cmd)
    return toObj<State>(strState)
  }
  
  async observation_space(): Promise<O> {
    const cmd = this.commander.make('observation_space')
    const strObsSpace = await this.requester.request(cmd)
    return toObj<O>(strObsSpace)
  }

  async action_space(): Promise<A> {
    const cmd = this.commander.make('observation_space')
    const strActSpace = await this.requester.request(cmd)
    return toObj<A>(strActSpace)
  }

  async action_sample(): Promise<Action> {
    const cmd = this.commander.make('action_sample')
    const strAction = await this.requester.request(cmd)
    return toObj<Action>(strAction)
  }

  close(): void {
    const cmd = this.commander.make('close')
    this.requester.request(cmd)
  }
  
}
