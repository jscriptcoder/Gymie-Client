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

export class ConnectionClosed extends Error {
  name: string = 'ConnectionClosed'
  constructor(message?: string) {
    super(message)
  }
}

export class ConnectionError extends Error {
  name: string = 'ConnectionError'
  constructor(message?: string) {
    super(message)
  }
}
