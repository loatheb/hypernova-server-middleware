const express = require('express')
const path = require('path')
const app = express()
const createGetComponent = require('hypernova/lib/createGetComponent')
const hypernovaMiddleware = require('../middleware')

app.get('/ping', (req, res) => {
  res.send('works')
})

app.use(hypernovaMiddleware({
  getComponent: createGetComponent({
    HeartBeat: path.resolve('./', '__test__', 'heartBeat-prerender-bundle.js'),
  }),
}))

app.listen(9999, function () {
  console.log('works')
})
