const express = require('express')
var logger = require('morgan');


const app = express()
app.use(logger('dev'));


app.get('/clientes', (req, res)=> {
    res.send("clientes")
})


app.listen(9000, () => {
    console.log("clientes")
})