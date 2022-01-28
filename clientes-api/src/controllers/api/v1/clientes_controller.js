//Clientes Controller
let validarCpf = require('./validar_cpf')

class ClientesController {
    async get(req, res) {
        let body = req.body
        if (body.nome && body.cpf && body.estado) {
            let cpf = body.cpf
            if (validarCpf(cpf)) {
                cpf =
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
}



module.exports = new ClientesController()