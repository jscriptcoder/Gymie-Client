**[gymie](../README.md)**

> [Globals](../globals.md) / Gymie

# Class: Gymie

WebSocket client that consumes an API wrapping [OpenAI Gym](https://github.com/openai/gym)
or gym-like environments such as [Gym Retro](https://github.com/openai/retro)
or [Unity ML-Agents](https://github.com/Unity-Technologies/ml-agents). Currently the best server is
its counterpart [Gymie-Server](https://github.com/jscriptcoder/Gymie-Server) 😉

## Hierarchy

* **Gymie**

## Index

### Constructors

* [constructor](gymie.md#constructor)

### Properties

* [requester](gymie.md#requester)
* [wsClient](gymie.md#wsclient)
* [wsConn](gymie.md#wsconn)

### Methods

* [close](gymie.md#close)
* [connect](gymie.md#connect)
* [make](gymie.md#make)
* [onClose](gymie.md#onclose)
* [onError](gymie.md#onerror)
* [onMessage](gymie.md#onmessage)
* [sender](gymie.md#sender)

## Constructors

### constructor

\+ **new Gymie**(): [Gymie](gymie.md)

*Defined in [src/Gymie.ts:73](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L73)*

**Returns:** [Gymie](gymie.md)

## Properties

### requester

•  **requester**: [Requester](requester.md)\<[Command](../interfaces/command.md), string>

*Defined in [src/Gymie.ts:27](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L27)*

___

### wsClient

•  **wsClient**: WebSocketClient = null

*Defined in [src/Gymie.ts:28](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L28)*

___

### wsConn

•  **wsConn**: connection = null

*Defined in [src/Gymie.ts:29](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L29)*

## Methods

### close

▸ **close**(`reasonCode?`: number, `description?`: string): void

*Defined in [src/Gymie.ts:147](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L147)*

Closes the connection with the server.

**`example`** 
```ts
gymie.close(1000, 'Done training')
```

#### Parameters:

Name | Type |
------ | ------ |
`reasonCode?` | number |
`description?` | string |

**Returns:** void

___

### connect

▸ **connect**(`wsApi`: string): Promise\<void>

*Defined in [src/Gymie.ts:93](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L93)*

Asynchronous method that establishes connection with the server.

**`throws`** [ConnectFailed](connectfailed.md)

**`example`** 
```ts
try {
  await gymie.connect('ws://0.0.0.0:5000')
} catch(err) {
  // err instanceof ConnectFailed
}
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`wsApi` | string | Host and port to connect to. |

**Returns:** Promise\<void>

___

### make

▸ **make**\<O, A>(`envId`: string, `seed?`: number): Promise\<[Env](env.md)\<O, A>>

*Defined in [src/Gymie.ts:126](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L126)*

Instantiates an environment, returning a promise wrapping and instance of Env

**`throws`** [NoConnected](noconnected.md)

**`example`** 
```ts
try {
  const env = await gymie.make<Continuous, Discrete>('LunarLander-v2')
} catch (err) {
  // err instanceof NoConnected
}
```

#### Type parameters:

Name | Type |
------ | ------ |
`O` | [Space](../interfaces/space.md) |
`A` | [Space](../interfaces/space.md) |

#### Parameters:

Name | Type |
------ | ------ |
`envId` | string |
`seed?` | number |

**Returns:** Promise\<[Env](env.md)\<O, A>>

___

### onClose

▸ **onClose**(`code`: number, `desc`: string): void

*Defined in [src/Gymie.ts:68](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L68)*

Callback function for `close` event. Rejects the promise of the incoming message with [ConnectionClosed](connectionclosed.md).

**`see`** [WebSocketConnection.onclose](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#closereasoncode-description)

**`see`** [Status Codes](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`code` | number | Close code sent by the server. |
`desc` | string | Reason why the server closed the connection.  |

**Returns:** void

___

### onError

▸ **onError**(`err`: [Error](connectfailed.md#error)): void

*Defined in [src/Gymie.ts:54](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L54)*

Callback function for `error` event. Rejects the promise of the incoming message with [ConnectionError](connectionerror.md).
See [WebSocketConnection.onerror](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`err` | [Error](connectfailed.md#error) | Thrown exception.  |

**Returns:** void

___

### onMessage

▸ **onMessage**(`message`: IMessage): void

*Defined in [src/Gymie.ts:45](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L45)*

Callback function for `message` event. Resolves the promise of the incoming message.
See [WebSocketConnection.onmessage](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#message)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | IMessage | Message received from the server (plus type).  |

**Returns:** void

___

### sender

▸ **sender**(`cmd`: [Command](../interfaces/command.md)): void

*Defined in [src/Gymie.ts:36](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Gymie.ts#L36)*

Callback function wrapping the socket's sending mechanism.
See [WebSocketConnection#sendUTF](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#sendutfstring)

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cmd` | [Command](../interfaces/command.md) | Command to be sent to the server.  |

**Returns:** void
