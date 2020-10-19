import Gymie from './Gymie'

export default Gymie

// This prevents `require('gymie').default`, which is an ugly
// experience for consumers of CommonJS modules
module.exports = Gymie
