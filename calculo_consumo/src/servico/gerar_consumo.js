const estados = require('./estados.json')
const axios = require('axios')

async function consulta(req, res) {
    for (var estado in estados.UF) {
        await axios.get(`http://localhost:9000/clientes/consulta/${estados.UF[estado].nome}/${1}/${20000}`)
            .then(async (response) => {
                for (let i in response.data.resultados.data) {
                    await gerar_cobranca(response.data.resultados.data[i])
                }

            })
            .catch((err) => {})
    }
    res.statusCode = 200
    res.send({
        mensagem: "serviço de calculo de consumo finalizado. foi gerado uma cobrança para todos os clientes cadastrados!"
    })
}

async function gerar_cobranca(response) {
    var data = gerar_data()
    var valor = gerar_valor(response.cpf)
    await axios.post('http://localhost:9001/cobranca/cadastro', {
            cpf: response.cpf,
            valor: valor,
            dataVencimento: data
        })
        .then()
        .catch((err) => {})
    return true
}

function gerar_data() {
    let minMes = 1
    let maxMes = 12
    let minAno = 2023
    let maxAno = 2030
    let dia = new Date().getDate()

    return new Date(Math.floor(Math.random() * (maxAno - minAno) + minAno), Math.floor(Math.random() * (maxMes - minMes) + minMes), dia)
}

function gerar_valor(cpf) {
    return parseInt(`${cpf[0]}${cpf[1]}${cpf[10]}${cpf[11]}`)
}


module.exports = consulta