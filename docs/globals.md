**[gymie](README.md)**

> Globals

# gymie

## Index

### Classes

* [Commander](classes/commander.md)
* [ConnectFailed](classes/connectfailed.md)
* [ConnectionClosed](classes/connectionclosed.md)
* [ConnectionError](classes/connectionerror.md)
* [Deferred](classes/deferred.md)
* [Env](classes/env.md)
* [Gymie](classes/gymie.md)
* [NoConnected](classes/noconnected.md)
* [Requester](classes/requester.md)

### Interfaces

* [Command](interfaces/command.md)
* [Continuous](interfaces/continuous.md)
* [Discrete](interfaces/discrete.md)
* [MultiBinary](interfaces/multibinary.md)
* [Space](interfaces/space.md)

### Type aliases

* [Action](globals.md#action)
* [Dict](globals.md#dict)
* [Done](globals.md#done)
* [Info](globals.md#info)
* [PromiseReject](globals.md#promisereject)
* [PromiseResolve](globals.md#promiseresolve)
* [Reward](globals.md#reward)
* [Sender](globals.md#sender)
* [State](globals.md#state)
* [Step](globals.md#step)

### Functions

* [noop](globals.md#noop)
* [toStr](globals.md#tostr)
* [toValue](globals.md#tovalue)

## Type aliases

### Action

Ƭ  **Action**\<T>: T *extends* Continuous ? number[] : number

*Defined in [src/Env.ts:79](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L79)*

Action allowed in the environment.

#### Type parameters:

Name | Description |
------ | ------ |
`T` | Either Discrete (```typeof action == number```) or Continuous (```typeof action == number[]```).  |

___

### Dict

Ƭ  **Dict**\<T>: { [key:string]: T;  }

*Defined in [src/utils.ts:9](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/utils.ts#L9)*

Dictionary-like

#### Type parameters:

Name | Description |
------ | ------ |
`T` | Data type held by the dictionary.  |

___

### Done

Ƭ  **Done**: boolean

*Defined in [src/Env.ts:89](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L89)*

Termianl flag.

___

### Info

Ƭ  **Info**: [Dict](globals.md#dict)\<any>

*Defined in [src/Env.ts:94](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L94)*

Extra info provided by the environment.

___

### PromiseReject

Ƭ  **PromiseReject**: (reason?: any) => void

*Defined in [src/Deferred.ts:9](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L9)*

`reject()` method

___

### PromiseResolve

Ƭ  **PromiseResolve**\<T>: (value?: T) => void

*Defined in [src/Deferred.ts:4](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L4)*

`resolved()` method

#### Type parameters:

Name |
------ |
`T` |

___

### Reward

Ƭ  **Reward**: number

*Defined in [src/Env.ts:84](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L84)*

Environment's reward.

___

### Sender

Ƭ  **Sender**\<T>: (value: T) => void

*Defined in [src/Requester.ts:8](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Requester.ts#L8)*

Sender callback.

#### Type parameters:

Name | Description |
------ | ------ |
`T` | Type of data to send.  |

___

### State

Ƭ  **State**\<T>: T *extends* Continuous ? number[] : number

*Defined in [src/Env.ts:73](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L73)*

State of the environment.

#### Type parameters:

Name | Description |
------ | ------ |
`T` | Either Discrete (```typeof state == number```) or Continuous (```typeof state == number[]```).  |

___

### Step

Ƭ  **Step**\<T>: [[State](globals.md#state)\<T>, [Reward](globals.md#reward), [Done](globals.md#done), [Info](globals.md#info)]

*Defined in [src/Env.ts:100](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L100)*

Tuple returned in each step.

#### Type parameters:

Name | Description |
------ | ------ |
`T` | Either Discrete (```typeof state == number```) or Continuous (```typeof state == number[]```).  |

## Functions

### noop

▸ `Const`**noop**(): void

*Defined in [src/utils.ts:14](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/utils.ts#L14)*

Empty function used as default value.

**Returns:** void

___

### toStr

▸ `Const`**toStr**(`obj`: object): string

*Defined in [src/utils.ts:21](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/utils.ts#L21)*

Converts a JS value to a JSON string.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`obj` | object | Object to stringify. |

**Returns:** string

JSON string.

___

### toValue

▸ `Const`**toValue**\<T>(`str`: string): T

*Defined in [src/utils.ts:28](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/utils.ts#L28)*

Converts a JSON string into a JS value (literal or object).

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`str` | string | JSON string to parse. |

**Returns:** T

Parsed value.
