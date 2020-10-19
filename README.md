# Gymie - Client

<a href="https://www.npmjs.com/package/gymie"><img alt="npm" src="https://img.shields.io/npm/v/gymie?label=NPM%20Package" /></a>

<table>
  <tbody>
    <tr>
      <td width="20%"><img src="https://raw.githubusercontent.com/jscriptcoder/Gymie-Client/master/resources/Gymie-logo.svg" align="left" /></td>
      <td>
        WebSocket client that consumes an API wrapping <a href="https://github.com/openai/gym">OpenAI Gym</a> or Gym-like environments such as <a href="https://github.com/openai/retro">Gym Retro</a> or <a href="https://github.com/Unity-Technologies/ml-agents">Unity ML-Agents</a>. Currently the best server is its counterpart <a href="https://github.com/jscriptcoder/Gymie-Server">Gymie-Server</a> 😉
      </td>
    </tr>
  </tbody>
</table>
    
## Content of this document
- [Installation](#installation)
- [How to run the client](#how-to-run-the-client-and-server)
- [API and how to use it](#api-and-how-to-use-it)
- [Testing Gymie](#testing-gymie)
- [Licence](#license)

## Installation

Gymie-Client is available as a [NPM package](https://www.npmjs.com/package/gymie), and can installed as a dependency as usual:

```bash
$ npm install gymie
```

You can also clone the repo and npm-link the library as follows, although there isn't really a good readon to do it this way, unless you wanna contribute to the library and test it locally.

```bash
$ git clone https://github.com/jscriptcoder/Gymie-Client
Cloning into 'Gymie-Client'...
...

$ cd Gymie-Client/
$ npm link
gymie@0.x.y preinstall /path/to/Gymie-Client
...

$ cd ~/path/to/project
$ npm link gymie
/path/to/project/node_modules/gymie -> /usr/local/lib/node_modules/gymie -> /path/to/Gymie-Client
```

During the installation [Gymie-Server](https://pypi.org/project/gymie/) will also be installed. It's important to note that Gymie-Server requires Python>=3.6, so I suggest to conda-create an environment with such version if it's not already installed... or upgrade Python to at least this version.

## How to run the client (and server)

Gymie-Client communicates with a server through WebSockets. This server will provide Gymie with an API to access the underlying Python library to create and interact with an environment. As mentioned before, this client comes with its [counterpart server](https://github.com/jscriptcoder/Gymie-Server). You can start the server from the command line:

```bash
$ python -m gymie --host 0.0.0.0 --port 5000
(84581) wsgi starting up on http://0.0.0.0:5000
```

Once the server is running, Gymie-Client can start interacting with it as follows:

```ts
import Gymie from 'gymie'

const gymie = new Gymie()
await gymie.connect('http://0.0.0.0:5000') // connects to the server

const env = await gymie.make('LunarLander-v2') // instantiates an environment

// accesing the underlying Gym-like library.
const space = await env.actionSpace()
const initialState = await env.reset()
const randomAction = await env.actionSample()
```

## API and how to use it

## Testing Gymie

Unit-tests live all next to the code they're testing, under the extension `src/*.test.ts`. You can run all the tests by executing:
```bash
$ npm test
```

## License

[MIT License](LICENSE) - Copyright (c) 2020 Francisco Ramos
