import { Continuous, State } from '../client/Env';

export default class RandomAgent {

  numActions: number = 0

  constructor(numActions: number) {
    this.numActions = numActions
  }

  act(state?: State<Continuous>): number {
    return Math.floor(Math.random()*(this.numActions - 0))
  }
}
