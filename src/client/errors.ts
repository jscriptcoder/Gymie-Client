/**
 * ConnectFailed Exception
 * [WebSocket - connectFailed event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md#connectfailed}
 */
export class ConnectFailed extends Error {
  name: string = 'ConnectFailed'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * Will happens if we try to instantiate an environment where 
 * there isn't yet an established connection.
 * NoConnected Exception
 */
export class NoConnected extends Error {
  name: string = 'NoConnected'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * ConnectionClosed Exception
 * [WebSocket - close event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#close}
 */
export class ConnectionClosed extends Error {
  name: string = 'ConnectionClosed'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * ConnectionError Exception
 * [WebSocket - error event]{@link https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error}
 */
export class ConnectionError extends Error {
  name: string = 'ConnectionError'
  constructor(message?: string) {
    super(message)
  }
}
