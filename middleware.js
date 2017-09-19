// const bodyParser = require('body-parser')

function assetsConfigurationType(config) {
  if (typeof config.getComponent !== 'function') {
    return new TypeError('Hypernova requires a `getComponent` property and it must be a function');
  }
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
    if (method.toLowerCase() === 'get' && originalUrl === endpoint) {
      if (configError) {
        throw configError
      }
      res.send('works')
      next()
    }

  }
}