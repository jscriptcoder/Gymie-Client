import Requester from './Requester'
import Commander, { Command } from './Commander'
import { Dict, toObj } from './utils'

/**
 * Base type for {@link Discrete} and {@link Continuous} spaces.
 */
export interface Space { 
  /**
   * Space name: 'Discrete' | 'Box' (Continuous).
   */
  name: string
}

/**
 * Discrete space.
 */
export interface Discrete extends Space { 
  name: 'Discrete'

  /**
   * Number of discrete values.
   */
  n: number 
}

/**
 * Continuous space.
 */
export interface Continuous extends Space {
  name: 'Box'

  /**
   * Space dimensions.
   */
  shape: number[]

  /**
   * Minimun values in the space.
   */
  low: number[]

  /**
   * Maximun values in the space.
   */
  high: number[]
}

/**
 * State of the environment.
 * @typeParam T Either Discrete (```typeof state == number```) or Continuous (```typeof state == number[]```).
 */
export type State<T> = T extends Continuous ? number[] : number

/**
 * Action allowed in the environment.
 * @typeParam T Either Discrete (```typeof action == number```) or Continuous (```typeof action == number[]```).
 */
export type Action<T> = T extends Continuous ? number[] : number

/**
 * Environment's reward.
 */
export type Reward = number

/**
 * Termianl flag.
 */
export type Done = boolean

/**
 * Extra info provided by the environment.
 */
export type Info = Dict<any>

/**
 * Tuple returned in each step.
 * @typeParam T Either Discrete (```typeof state == number```) or Continuous (```typeof state == number[]```).
 */
export type Step<T> = [State<T>, Reward, Done, Info]

/**
 * Wrapper for an [OpenAI Gym Environment]{@link https://gym.openai.com/envs/}
 */
export default class Env<O extends Space, A extends Space> {

  commander: Commander = null
  requester: Requester<Command, string> = null
  
  constructor(instanceId: string, requester: Requester<Command, string>) {
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
