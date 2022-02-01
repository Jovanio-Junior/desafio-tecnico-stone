//Clientes Controller
var validarCpf = require('./validar_cpf')
var formatar_cpf = require('./formatar_cpf')
const knex = require('../../../config/knex/knex')
const {
    attachPaginate
} = require('knex-paginate');
const {
    length
} = require('../../../routes');
attachPaginate();

class ClientesController {
    async post(req, res) {
        var body = req.body
        if (body.nome && body.cpf && body.estado) {
            var cpf = body.cpf
            if (body.cpf.length >= 11 && body.cpf.length <= 14) {
                cpf = formatar_cpf.formataCpfCadastro(cpf)
                if (validarCpf(cpf)) {
                    await knex('clientes')
                        .where({
                            cpf: cpf
                        })
                        .first()
                        .then(async (found) => {
                            if (found) {
                                res.statusCode = 409
                                res.send({
                                    err: "Usuario ja cadastrado."
                                })
                            } else {
                                var aus = await knex('clientes')
                                    .insert({
                                        nome: body.nome,
                                        estado: body.estado,
                                        cpf: cpf
                                    })
                                    .then(() => {
                                        res.statusCode = 201
                                        res.send({
                                            success: `Usuario ${body.nome} adicionado com sucesso.`
                                        })
                                    })
                                    .catch(err => {
                                        res.statusCode = 500
                                        res.send({
                                            err: err
                                        })
                                    })

                            }
                        })
                } else {
                    res.statusCode = 406
                    res.send({
                        err: "CPF invalido."
                    })
                }
            } else {
                res.statusCode = 406
                res.send({
                    err: "CPF invalido."
                })

            }
        } else {
            res.statusCode = 400
            res.send({
                err: `O(s) campos ${!body.nome
                    ? "Nome, " : ''}${!body.estado
                        ? "Estado, " : ''}${!body.cpf 
                            ? "CPF " : ''}não foram informadas.`
            })
        }
    }

    async getByCpf(req, res) {
        var body = req.body
        console.log(req.params)
        if (body.cpf) {
            var cpf = body.cpf
            if (body.cpf.length >= 11 && body.cpf.length <= 14) {
                cpf = formatar_cpf.formataCpfCadastro(cpf)
                await knex('clientes')
                    .where({
                        cpf: cpf
                    })
                    .first()
                    .then((data) => {
                        res.statusCode = 200
                        res.json({
                            localizado: true,
                            nome: data.nome,
                            estado: data.estado
                        })
                    })
                    .catch((err) => {
                        res.statusCode = 404
                        res.json({
                            localizado: false,
                            err: "Usuario não localizado"
                        })

                    })
            } else {
                res.statusCode = 406
                res.send({
                    err: "CPF invalido."
                })
            }
        } else {
            res.statusCode = 400
            res.send({
                err: `O CPF não foi informado.`
            })
        }
    }

    async getByEstado(req, res) {
        if (req.params.estado) {
            var pagination = {}
            await knex('clientes')
                .where({
                    estado: req.params.estado
                })
                .select()
                .paginate({
                    perPage: req.params.perPage || 20,
                    currentPage: req.params.page || 1
                })
                .then((data) => {
                    res.statusCode = 200
                    res.json({
                        resultados: data
                    })
                })
                .catch((err) => {})
        } else {
            res.statusCode = 400
            res.send({
                err: "Estado não informado."
            })
        }
    }

}



module.exports = new ClientesController()