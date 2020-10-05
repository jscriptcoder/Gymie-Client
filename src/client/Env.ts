import { GymieRequester } from './GymieClient'
import Commander from './Commander'
import { Dict } from './utils'

type State = number[]
type Action = number | number[]
type Reward = number
type Done = boolean
type Info = Dict<any>
type Step = [State, Reward, Done, Info]

export interface Space { name: string }

export interface Discrete extends Space { n: number }

export interface Box extends Space {
  shape: number[],
  low: number[],
  high: number[],
}

export default class Env<S> {

  commander: Commander = null
  requester: GymieRequester = null
  
  constructor(instanceId: string, requester: GymieRequester) {
    this.commander = new Commander(instanceId)
    this.requester = requester
  }

  async step(action: Action): Promise<Step> {
    const cmd = this.commander.make('step', { action })
    const strStep = await this.requester.request(cmd)
    return JSON.parse(strStep)
  }

  async reset(): Promise<State> {
    const cmd = this.commander.make('reset')
    const strState = await this.requester.request(cmd)
    return JSON.parse(strState)
  }
  
  async observation_space(): Promise<S> {
    return null
  }

  async action_space(): Promise<S> {
    return null
  }

  async action_sample(): Promise<Action> {
    const cmd = this.commander.make('action_sample')
    const strAction = await this.requester.request(cmd)
    return JSON.parse(strAction)
  }

  close(): void {
    const cmd = this.commander.make('close')
    this.requester.request(cmd)
  }
  
}
