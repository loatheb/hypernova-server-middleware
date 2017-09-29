const bodyParser = require('body-parser')
const renderBatch = require('hypernova/utils/renderBatch')

function assetsConfigurationType(config) {
  if (typeof config.getComponent !== 'function') {
    return new TypeError('Hypernova requires a `getComponent` property and it must be a function');
  }
}

function deepEqual(a, b) {
  return a === b
}

const defaultConfig = {
  bodyParser: {
    limit: 1024 * 1000,
  },
  devMode: false,
  endpoint: '/batch',
  files: [],
  logger: {},
  plugins: [],
  port: 8080,
  host: '0.0.0.0',
};

module.exports = (customConfig) => {
  const config = Object.assign({}, defaultConfig, customConfig);
  const configError = assetsConfigurationType(config)

  return (req, res, next) => {
    const { method, originalUrl } = req
    const { endpoint } = config
    if (deepEqual(method.toLowerCase(), 'post') && deepEqual(originalUrl, endpoint)) {

      /* Will throw the error at the server real call time instead of the start time */
      if (configError) throw configError

      /* Add body-parser middleware to handle the body in request, this callback will really kill me! */
      bodyParser(req, res, () => {
        renderBatch(config, () => false)
      })

      /* Pipe to the next middleware to do the next job */
      next()
    }
  }
}