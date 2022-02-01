const express = require('express')
var logger = require('morgan');
const routes = require('./src/routes/index')
const middlewares = require('./src/config/middleware')

const app = express()
app.use(...middlewares)

app.use(logger('dev'));

app.use(routes)

app.get('/clientes', (req, res) => {
    res.statusCode = 200
    res.send('ola')
})


app.listen(9001, () => {
    console.log("Api de Cobranças rodando na porta 9001")
})

module.exports = app