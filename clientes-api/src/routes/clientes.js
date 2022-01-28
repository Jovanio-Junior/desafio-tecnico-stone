const routes = require('express').Router()
const routeNames = require('./routeNames')
const clientesController = require('../controllers/api/v1/clientes_controller')

routes.get(routeNames.CLIENTES_CONSULTA, (req, res) => clientesController.get(req, res))

routes.post(routeNames.CLIENTES_CADASTRO, (req, res) => clientesController.post(req, res))

module.exports = routes