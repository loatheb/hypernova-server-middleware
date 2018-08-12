const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('../middleware');
const component = require('./component');

const app = express();

app.use(bodyParser.json({
  limit: 1024 * 1000,
}));

app.use(middleware({
  getComponent(name) {
    if (name === 'MyComponent') {
      return component;
    }
    return null;
  },
}));

app.listen(3030);
