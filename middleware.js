const isEqual = require('lodash.isequal');
const renderBatch = require('hypernova/lib/utils/renderBatch');

function assetsConfigurationType(config) {
  if (typeof config.getComponent !== 'function') {
    return new TypeError('Hypernova requires a `getComponent` property and it must be a function');
  }
  return null;
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
  const configError = assetsConfigurationType(config);

  return async (req, res, next) => {
    const { method, originalUrl } = req;
    const { endpoint } = config;
    if (isEqual(method.toLowerCase(), 'post') && isEqual(originalUrl, endpoint)) {
      if (configError) throw configError;
      const middleware = renderBatch(config, () => false);
      await middleware(req, res, next);
    }
  };
};
