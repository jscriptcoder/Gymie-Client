**[gymie](../README.md)**

> [Globals](../globals.md) / Deferred

# Class: Deferred\<T>

Returns an object with a promise on the way and two methods,
`resolve()` and `reject()`, to change its state.

**`see`** [Deferred object](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred)

## Type parameters

Name | Description |
------ | ------ |
`T` | Data wrapped in the promise.  |

## Hierarchy

* **Deferred**

## Index

### Constructors

* [constructor](deferred.md#constructor)

### Properties

* [promise](deferred.md#promise)
* [reject](deferred.md#reject)
* [resolve](deferred.md#resolve)

## Constructors

### constructor

\+ **new Deferred**(): [Deferred](deferred.md)

*Defined in [src/Deferred.ts:30](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L30)*

**Returns:** [Deferred](deferred.md)

## Properties

### promise

•  **promise**: Promise\<T> = null

*Defined in [src/Deferred.ts:30](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L30)*

___

### reject

•  **reject**: [PromiseReject](../globals.md#promisereject) = null

*Defined in [src/Deferred.ts:29](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L29)*

Changes the state of the promise to `rejected`

**`see`** [Promise.reject()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

___

### resolve

•  **resolve**: [PromiseResolve](../globals.md#promiseresolve)\<T> = null

*Defined in [src/Deferred.ts:23](https://github.com/jscriptcoder/Gymie-Client/blob/89194c5/src/Deferred.ts#L23)*

Changes the state of the promise to `resolved`

**`see`** [Promise.resolve()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
