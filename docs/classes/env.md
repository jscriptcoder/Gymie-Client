**[gymie](../README.md)**

> [Globals](../globals.md) / Env

# Class: Env\<O, A>

Wrapper for an [OpenAI Gym](https://gym.openai.com/envs/) or gym-like environments.

## Type parameters

Name | Type | Description |
------ | ------ | ------ |
`O` | [Space](../interfaces/space.md) | Observation space. |
`A` | [Space](../interfaces/space.md) | Action space.  |

## Hierarchy

* **Env**

## Index

### Constructors

* [constructor](env.md#constructor)

### Properties

* [commander](env.md#commander)
* [requester](env.md#requester)

### Methods

* [actionSample](env.md#actionsample)
* [actionSpace](env.md#actionspace)
* [close](env.md#close)
* [observationSpace](env.md#observationspace)
* [reset](env.md#reset)
* [step](env.md#step)

## Constructors

### constructor

\+ **new Env**(`instanceId`: string, `requester`: [Requester](requester.md)\<[Command](../interfaces/command.md), string>): [Env](env.md)

*Defined in [src/Env.ts:110](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L110)*

#### Parameters:

Name | Type |
------ | ------ |
`instanceId` | string |
`requester` | [Requester](requester.md)\<[Command](../interfaces/command.md), string> |

**Returns:** [Env](env.md)

## Properties

### commander

•  **commander**: [Commander](commander.md) = null

*Defined in [src/Env.ts:109](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L109)*

___

### requester

•  **requester**: [Requester](requester.md)\<[Command](../interfaces/command.md), string> = null

*Defined in [src/Env.ts:110](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L110)*

## Methods

### actionSample

▸ **actionSample**(): Promise\<[Action](../globals.md#action)\<A>>

*Defined in [src/Env.ts:182](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L182)*

Generates a random action.

**`example`** 
```ts
const action = await env.actionSample()
```

**Returns:** Promise\<[Action](../globals.md#action)\<A>>

Promise with the action.

___

### actionSpace

▸ **actionSpace**(): Promise\<A>

*Defined in [src/Env.ts:168](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L168)*

Generates a dictionary with info about the action space.

**`example`** 
```ts
const { name, n } = await env.actionSpace()
```

**Returns:** Promise\<A>

Promise with the action space.

___

### close

▸ **close**(): Promise\<boolean>

*Defined in [src/Env.ts:196](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L196)*

Closes the environment.

**`example`** 
```ts
const isClosed = await env.close()
```

**Returns:** Promise\<boolean>

Promise with the confirmation.

___

### observationSpace

▸ **observationSpace**(): Promise\<O>

*Defined in [src/Env.ts:154](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L154)*

Generates a dictionary with info about the observation space.

**`example`** 
```ts
const { name, shape, low, high } = await env.observationSpace()
```

**Returns:** Promise\<O>

Promise with the observation space.

___

### reset

▸ **reset**(): Promise\<[State](../globals.md#state)\<O>>

*Defined in [src/Env.ts:140](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L140)*

Resets the environment and returns the initial state.

**`example`** 
```ts
const initialState = await env.reset()
```

**Returns:** Promise\<[State](../globals.md#state)\<O>>

Promise with the initial state.

___

### step

▸ **step**(`action`: [Action](../globals.md#action)\<A>): Promise\<[Step](../globals.md#step)\<O>>

*Defined in [src/Env.ts:126](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Env.ts#L126)*

Performs a step in the environment.

**`example`** 
```ts
const [next_state, reward, done, info] = await env.step([1.5, 2.2])
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`action` | [Action](../globals.md#action)\<A> | Action to execute. |

**Returns:** Promise\<[Step](../globals.md#step)\<O>>

Promise with the result of the step.
