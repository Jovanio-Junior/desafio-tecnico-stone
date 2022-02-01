const express = require('express')
var logger = require('morgan');
const knex = require('./src/config/knex/knex')
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


app.listen(9000, () => {
    console.log("Api de Clientes Rodando na porta 9000")
})

module.exports = app