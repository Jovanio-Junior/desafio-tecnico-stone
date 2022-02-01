const routes = require('express').Router()
const routeNames = require('./routeNames')
const cobrancasController = require('../controllers/api/v1/cobrancas')

routes.get(`${routeNames.COBRANCAS_CONSULTA}`, (req, res) => cobrancasController.getCobranca(req, res))
routes.post(routeNames.COBRANCAS_CADASTRO, (req, res) => cobrancasController.postCobranca(req, res))
routes.get(routeNames.COBRANCAS_MAP_REDUCE, (req, res) => cobrancasController.mapReduce(req, res))

module.exports = routes