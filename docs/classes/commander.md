**[gymie](../README.md)**

> [Globals](../globals.md) / Commander

# Class: Commander

Takes care of creating commands to be sent to the server.

Holds the `instance_id` of the current environment, which will be
sent along with other parameters in each call.

A command consists of:
```ts
{
  method: 'method_name', // addreses the different API methods exposed by the server
  params: {...} // a collection of parameters to be passed to the method API
}
```

## Hierarchy

* **Commander**

## Index

### Constructors

* [constructor](commander.md#constructor)

### Properties

* [instanceId](commander.md#instanceid)

### Methods

* [make](commander.md#make)

## Constructors

### constructor

\+ **new Commander**(`instanceId`: string): [Commander](commander.md)

*Defined in [src/Commander.ts:30](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Commander.ts#L30)*

#### Parameters:

Name | Type |
------ | ------ |
`instanceId` | string |

**Returns:** [Commander](commander.md)

## Properties

### instanceId

•  **instanceId**: string = ""

*Defined in [src/Commander.ts:30](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Commander.ts#L30)*

Environment's id.

## Methods

### make

▸ **make**(`method`: string, `params`: [Dict](../globals.md#dict)\<any>): [Command](../interfaces/command.md)

*Defined in [src/Commander.ts:42](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Commander.ts#L42)*

Creates a new command with the environment's id as parameter.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`method` | string | - | API name. |
`params` | [Dict](../globals.md#dict)\<any> | {} | Parameters for the API method. |

**Returns:** [Command](../interfaces/command.md)

Command sent to the server.
