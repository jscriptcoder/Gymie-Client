export class ConnectFailed extends Error {
  name: string = 'ConnectFailed'
  constructor(message?: string) {
    super(message)
  }
}

export class NoConnected extends Error {
  name: string = 'NoConnected'
  constructor(message?: string) {
    super(message)
  }
}
