import { Dict } from "./types"

export interface Command {
  method: string
  params: Dict<any>
}

export default class Commander {

  instanceId: string = ''

  constructor(instanceId: string) {
    this.instanceId = instanceId
  }

  make(method: string, params: Dict<any> = {}): Command {
    params.instance_id = this.instanceId
    return { method, params }
  }
}
