const express = require('express')
const app = express()

const hypernovaMiddleware = require('./middleware')

app.use(hypernovaMiddleware())

app.listen(9999)
