**[gymie](../README.md)**

> [Globals](../globals.md) / Requester

# Class: Requester\<S, R>

The Requester will take care of handling request and
data delievery in a one-way communication fashion.

## Type parameters

Name | Description |
------ | ------ |
`S` | Type of data to send. |
`R` | Type of data to receive.  |

## Hierarchy

* **Requester**

## Index

### Constructors

* [constructor](requester.md#constructor)

### Properties

* [incoming](requester.md#incoming)
* [sender](requester.md#sender)

### Methods

* [request](requester.md#request)

## Constructors

### constructor

\+ **new Requester**(`sender`: [Sender](../globals.md#sender)\<S>): [Requester](requester.md)

*Defined in [src/Requester.ts:26](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Requester.ts#L26)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`sender` | [Sender](../globals.md#sender)\<S> | noop |

**Returns:** [Requester](requester.md)

## Properties

### incoming

•  **incoming**: [Deferred](deferred.md)\<R> = null

*Defined in [src/Requester.ts:21](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Requester.ts#L21)*

Promise with the incoming message.

___

### sender

•  **sender**: [Sender](../globals.md#sender)\<S> = null

*Defined in [src/Requester.ts:26](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Requester.ts#L26)*

Wrapper function for the underlying logic to send data.

## Methods

### request

▸ **request**(`data`: S): Promise\<R>

*Defined in [src/Requester.ts:37](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Requester.ts#L37)*

Sends a request to the server

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | S | Data to be sent |

**Returns:** Promise\<R>

Promise holding the response data from the server.
