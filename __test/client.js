const express = require('express');
const Renderer = require('hypernova-client');

const app = express();

const renderer = new Renderer({
  url: 'http://localhost:3030/batch',
});

app.get('/', (req, res) => {
  const jobs = {
    MyComponent: { name: req.query.name || 'Stranger' },
  };

  renderer.render(jobs).then(html => res.send(html));
});

app.listen(8080, () => console.log('Now listening'));
