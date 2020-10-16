import Requester from './Requester'
import Commander, { Command } from './Commander'
import { Dict, toValue } from './utils'

/**
 * Base type for {@link Discrete} and {@link Continuous} spaces.
 */
export interface Space { 
  /**
   * Space name: 'Discrete' | 'Box' (Continuous) | MultiBinary.
   */
  name: string
}

/**
 * Discrete space.
 * Example: `5`
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
 * Example: [[1.5, 2, 3.2], [1.2, 5.0, 4.1]]
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
 * Multi Binary space.
 * Example: [1, 1, 0, 1, 0]
 */
export interface MultiBinary extends Space {
  name: 'MultiBinary'

  /**
   * Size of list of discrete values
   */
  n: number

  /**
   * Space dimensions.
   */
  shape: number[]
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
 * Wrapper for an {@link https://gym.openai.com/envs/ OpenAI Gym} or gym-like environments.
 * @typeParam O Observation space.
 * @typeParam A Action space.
 */
export default class Env<O extends Space, A extends Space> {

  commander: Commander = null
  requester: Requester<Command, string> = null
  
  constructor(instanceId: string, requester: Requester<Command, string>) {
    this.commander = new Commander(instanceId)
    this.requester = requester
  }

  /**
   * Performs a step in the environment.
   * @param action Action to execute.
   * @returns Promise with the result of the step.
   * @example
   *   const [next_state, reward, done, info] = await env.step([1.5, 2.2])
   */
  async step(action: Action<A>): Promise<Step<O>> {
    const cmd = this.commander.make('step', { action })
    const strStep = await this.requester.request(cmd)
    return toValue<Step<O>>(strStep)
  }

  /**
   * Resets the environment and returns the initial state.
   * @returns Promise with the initial state.
   */
  async reset(): Promise<State<O>> {
    const cmd = this.commander.make('reset')
    const strState = await this.requester.request(cmd)
    return toValue<State<O>>(strState)
  }
  
  /**
   * Generates a dictionary with info about the observation space.
   * @returns Promise with the observation space.
   */
  async observation_space(): Promise<O> {
    const cmd = this.commander.make('observation_space')
    const strObsSpace = await this.requester.request(cmd)
    return toValue<O>(strObsSpace)
  }

  /**
   * Generates a dictionary with info about the action space.
   * @returns Promise with the action space.
   */
  async action_space(): Promise<A> {
    const cmd = this.commander.make('action_space')
    const strActSpace = await this.requester.request(cmd)
    return toValue<A>(strActSpace)
  }

  /**
   * Generates a random action.
   * @returns Promise with the action.
   */
  async action_sample(): Promise<Action<A>> {
    const cmd = this.commander.make('action_sample')
    const strAction = await this.requester.request(cmd)
    return toValue<Action<A>>(strAction)
  }

  /**
   * Closes the environment.
   * @returns Promise with the confirmation.
   */
  async close(): Promise<boolean> {
    const cmd = this.commander.make('close')
    const resp = await this.requester.request(cmd)
    return toValue<boolean>(resp)
  }
  
}
