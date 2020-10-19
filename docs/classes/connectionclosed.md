**[gymie](../README.md)**

> [Globals](../globals.md) / ConnectionClosed

# Class: ConnectionClosed

Emitted when the connection has been fully closed and the socket is no longer connected.

**`see`** [WebSocketConnection.onClose](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#closereasoncode-description)

## Hierarchy

* [Error](connectfailed.md#error)

  ↳ **ConnectionClosed**

## Index

### Constructors

* [constructor](connectionclosed.md#constructor)

### Properties

* [message](connectionclosed.md#message)
* [name](connectionclosed.md#name)
* [stack](connectionclosed.md#stack)
* [Error](connectionclosed.md#error)

## Constructors

### constructor

\+ **new ConnectionClosed**(`message?`: string): [ConnectionClosed](connectionclosed.md)

*Defined in [src/errors.ts:33](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [ConnectionClosed](connectionclosed.md)

## Properties

### message

•  **message**: string

*Inherited from [ConnectFailed](connectfailed.md).[message](connectfailed.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string = "ConnectionClosed"

*Overrides void*

*Defined in [src/errors.ts:33](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L33)*

___

### stack

• `Optional` **stack**: string

*Inherited from [ConnectFailed](connectfailed.md).[stack](connectfailed.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:984*
