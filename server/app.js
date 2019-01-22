const express = require('express')
const path = require('path')
const es6Renderer = require('express-es6-template-engine')
const router = require('./route')
const logger = require('morgan')
const app = express()
const PORT = process.env.PORT || 3000


app.engine('html', es6Renderer)
    .set('views', path.join(__dirname, '/views'))
    .set('view engine', 'html')
    .use(logger('dev'))
    .use(router)
    .use('/assets', express.static(path.join(__dirname, '../build')))
    .listen(PORT, () => console.log(`Start server on http://localhost:${PORT}`))
