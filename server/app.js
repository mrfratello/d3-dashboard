const express = require('express')
const path = require('path')
const es6Renderer = require('express-es6-template-engine')
const app = express()
const port = 3000

app.engine('html', es6Renderer)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'html')

app.use('/assets', express.static(path.join(__dirname, '../build')))
app.get('/', (req, res) => res.render('index'))

app.listen(port, () => console.log(`Start server on http://localhost:${port}`))