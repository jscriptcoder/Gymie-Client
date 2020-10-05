import { GymieRequester } from './GymieClient'
import { makeCommand, Command } from './utils'

type State = number[]
type Action = number | number[]
type Reward = number
type Done = boolean
type Info = {[key: string]: any}
type Step = [State, Reward, Done, Info]

interface Space { name: string }
interface Discrete extends Space { n: number }
interface Box extends Space {
  shape: number[],
  low: number[],
  high: number[],
}

export default class Env<S> {

  requester: GymieRequester
  instanceId: string = ''
  
  constructor(instanceId: string, requester: GymieRequester) {
    this.instanceId = instanceId
    this.requester = requester
  }

  async step(action: Action): Promise<Step> {
    const cmd = makeCommand('step', {
      instance_id: this.instanceId, 
      action,
    })
    const strStep = await this.requester.request(cmd)
    return JSON.parse(strStep)
  }

  async reset(): Promise<State> {
    const cmd = makeCommand('reset')
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
    const cmd = makeCommand('action_sample', { instance_id: this.instanceId })
    const strAction = await this.requester.request(cmd)
    return JSON.parse(strAction)
  }

  close(): void {}
  
}
