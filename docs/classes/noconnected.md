**[gymie](../README.md)**

> [Globals](../globals.md) / NoConnected

# Class: NoConnected

Will happen if we try to instantiate an environment where
there isn't yet an established connection.

## Hierarchy

* [Error](connectfailed.md#error)

  ↳ **NoConnected**

## Index

### Constructors

* [constructor](noconnected.md#constructor)

### Properties

* [message](noconnected.md#message)
* [name](noconnected.md#name)
* [stack](noconnected.md#stack)
* [Error](noconnected.md#error)

## Constructors

### constructor

\+ **new NoConnected**(`message?`: string): [NoConnected](noconnected.md)

*Defined in [src/errors.ts:22](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`message?` | string |

**Returns:** [NoConnected](noconnected.md)

## Properties

### message

•  **message**: string

*Inherited from [ConnectFailed](connectfailed.md).[message](connectfailed.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string = "NoConnected"

*Overrides void*

*Defined in [src/errors.ts:22](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/errors.ts#L22)*

___

### stack

• `Optional` **stack**: string

*Inherited from [ConnectFailed](connectfailed.md).[stack](connectfailed.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:984*
