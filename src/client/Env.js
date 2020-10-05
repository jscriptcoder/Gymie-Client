export default class Env {

  instanceId = ''
  
  constructor(instanceId) {
    this.instanceId = instanceId
  }

  async step(action) {}

  async reset() {}
  
  async observation_space() {}

  async action_space() {}

  async action_sample() {}

  close() {}
  
}
