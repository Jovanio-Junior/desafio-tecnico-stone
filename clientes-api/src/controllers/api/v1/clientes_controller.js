//Clientes Controller
let validarCpf = require('./validar_cpf')
let formatarCpf = require('./formatar_cpf')
const formatar_cpf = require('./formatar_cpf')
class ClientesController {
    async get(req, res) {
        let body = req.body
        if (body.nome && body.cpf && body.estado) {
            let cpf = body.cpf

            if(body.cpf.length >= 11 || body.cpf.length <=14)
            {
                cpf = formatar_cpf.formataCpfCadastro(cpf)
                if (validarCpf(cpf)) {

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
}



module.exports = new ClientesController()