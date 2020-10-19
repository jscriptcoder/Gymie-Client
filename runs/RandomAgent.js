class RandomAgent {
  
  constructor(numActions) {
    this.numActions = numActions
  }

  act(state) {
    return Math.floor(Math.random()*(this.numActions - 0))
  }
}

module.exports = RandomAgent
