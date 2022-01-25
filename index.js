//index.js
const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));


app.get('/asd', (req, res) => {

    res.send("asdf")
})

function selectServicoApi(req) {

    if (req.path.startsWith('/clientes'))
        return 'http://localhost:9000/';
    else if (req.path.startsWith('/cobrancas'))
        return 'http://localhost:9001/';
}

app.use(
    (req, res, next) => {
    httpProxy(selectServicoApi(req))(req, res, next);
});


app.listen(10000, () => {
    console.log('API Gateway running!');
});