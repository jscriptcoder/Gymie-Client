/**
 * Compilation of custom errors.
 */

// tslint:disable:max-classes-per-file

/**
 * Emitted when there is an error connecting to the remote host or the handshake response sent by the server is invalid.
 * @see {@link https://bit.ly/2TcFJcv WebSocketClient.onConnectionFailed}
 */
export class ConnectFailed extends Error {
  name: string = 'ConnectFailed'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * Will happen if we try to instantiate an environment where 
 * there isn't yet an established connection.
 */
export class NoConnected extends Error {
  name: string = 'NoConnected'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * Emitted when the connection has been fully closed and the socket is no longer connected.
 * @see {@link https://bit.ly/3kiSePP WebSocketConnection.onClose}
 */
export class ConnectionClosed extends Error {
  name: string = 'ConnectionClosed'
  constructor(message?: string) {
    super(message)
  }
}

/**
 * Emitted when there has been a socket error. If this occurs, a close event will also be emitted.
 * @see {@link https://bit.ly/31v9Wbw WebSocketConnection.onError}
 */
export class ConnectionError extends Error {
  name: string = 'ConnectionError'
  constructor(message?: string) {
    super(message)
  }
}
