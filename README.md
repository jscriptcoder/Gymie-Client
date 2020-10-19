# Gymie - Client

<a href="https://www.npmjs.com/package/gymie"><img alt="npm" src="https://img.shields.io/npm/v/gymie?label=NPM%20Package" /></a>

<table>
  <tbody>
    <tr>
      <td width="200"><img src="https://raw.githubusercontent.com/jscriptcoder/Gymie-Client/master/resources/Gymie-logo.svg" align="left" /></td>
      <td>
        WebSocket client that consumes an API wrapping <a href="https://github.com/openai/gym">OpenAI Gym</a> or gym-like environments such as <a href="https://github.com/openai/retro">Gym Retro</a> or <a href="https://github.com/Unity-Technologies/ml-agents">Unity ML-Agents</a>. Currently the best server is its counterpart <a href="https://github.com/jscriptcoder/Gymie-Server">Gymie-Server</a> 😉
      </td>
    </tr>
  </tbody>
</table>
    
## Content of this document
- [Installation](#installation)
- [How to run the client](#how-to-run-the-client)
- [API and how to use it](#api-and-how-to-use-it)
- [Testing Gymie](#testing-gymie)
- [Licence](#license)

## Installation

Gymie-client is available as a [NPM package](https://www.npmjs.com/package/gymie), and can installed as a dependency as usual:

```bash
$ npm install gymie
```

You can also clone the repo and npm-link the library as follow:

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

Although there isn't really a good readon to do it this way, unless you wanna contribute to the library and test it locally.

## How to run the client

## API and how to use it

## Testing Gymie

## License

[MIT License](LICENSE) - Copyright (c) 2020 Francisco Ramos
