const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const api = (req, res, next) => {
  next()
}

app.use(api)

app.get('/', (req, res, next) => {
  res.send('works')
})

app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  console.log(req.params.id)
  if (req.params.id == 123) {
    next()
  }
  // next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})