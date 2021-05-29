/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  plugins: [],
  mount: {
    src: '/',
    'examples/src': '/src',
    'examples/public': { url: '/', static: true },
  },
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2017',
  },
}
