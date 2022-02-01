//index.js
const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');
let gconsumo = require('./calculo_consumo/src/servico/gerar_consumo')

app.use(logger('dev'));

app.get('/gerar-consumo', (req, res) => {
    gconsumo(req, res)
})


function selectServicoApi(req) {

    if (req.path.startsWith('/clientes'))
        return 'http://localhost:9000/';
    else if (req.path.startsWith('/cobranca'))
        return 'http://localhost:9001/';
}

app.use(
    (req, res, next) => {
        httpProxy(selectServicoApi(req))(req, res, next);
    });


app.listen(10000, (err) => {
    console.log('API Gateway running! in ', 1000, ' port')
});