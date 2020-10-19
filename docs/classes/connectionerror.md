**[gymie](../README.md)**

> [Globals](../globals.md) / ConnectionError

# Class: ConnectionError

Emitted when there has been a socket error. If this occurs, a close event will also be emitted.

**`see`** [WebSocketConnection.onError](https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketConnection.md#error)

## Hierarchy

* [Error](connectfailed.md#error)

  ↳ **ConnectionError**

## Index

### Constructors

* [constructor](connectionerror.md#constructor)

### Properties

* [message](connectionerror.md#message)
* [name](connectionerror.md#name)
* [stack](connectionerror.md#stack)
* [Error](connectionerror.md#error)

## Constructors

### constructor

\+ **new ConnectionError**(`message?`: string): [ConnectionError](connectionerror.md)

*Defined in [src/errors.ts:44](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L44)*

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [ConnectionError](connectionerror.md)

## Properties

### message

•  **message**: string

*Inherited from [ConnectFailed](connectfailed.md).[message](connectfailed.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string = "ConnectionError"

*Overrides void*

*Defined in [src/errors.ts:44](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L44)*

___

### stack

• `Optional` **stack**: string

*Inherited from [ConnectFailed](connectfailed.md).[stack](connectfailed.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:984*
