const routes = require('express').Router()
const routeNames = require('./routeNames')
const clientesController = require('../controllers/api/v1/clientes')

routes.post(`${routeNames.CLIENTES_CONSULTA}`, (req, res) => clientesController.getByCpf(req, res))

routes.get(`${routeNames.CLIENTES_CONSULTA}/:estado/:page?/:perPage?`, (req, res) => clientesController.getByEstado(req, res))

routes.post(routeNames.CLIENTES_CADASTRO, (req, res) => clientesController.post(req, res))

module.exports = routes