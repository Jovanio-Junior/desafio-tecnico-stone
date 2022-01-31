const firebasedb = require('firebase/firestore')
const db = require('../../../models/index')
const axios = require('axios')
const estados = require('./estados.json')


class CobrancasController {
    async postCobranca(req, res) {
        let body = req.body
        if (body.dataVencimento && body.cpf && body.valor) {
            await axios.post('http://localhost:9000/clientes/consulta', {
                    cpf: body.cpf
                })
                .then(async (response) => {
                    if ((typeof body.dataVencimento == 'string') && (typeof body.valor == 'number')) {
                        var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
                        let dataVencimento = new Date(body.dataVencimento.replace(pattern, '$3-$2-$1'))
                        let aux = new Date()
                        let aux1 = aux.getDate().toString() + '/' +
                            `${aux.getMonth().toString() + 1}/` +
                            aux.getFullYear().toString()
                        let dataAtual = new Date(aux1.replace(pattern, '$3-$2-$1'))
                        if (dataAtual <= dataVencimento) {
                            try {
                                await firebasedb.addDoc(firebasedb.collection(db, 'cobrancas'), {
                                    cpf: body.cpf,
                                    valor: body.valor,
                                    dataVencimento: body.dataVencimento
                                })
                                res.statusCode = 201
                                res.send({
                                    success: `Cobrança ${body.valor} com data de vencimento em ${body.dataVencimento} cadastrada`
                                })
                            } catch (err) {
                                res.statusCode = 500
                                res.send({
                                    err: err
                                })
                            }
                        } else {
                            res.statusCode = 406
                            res.send({
                                err: 'Data para cobrança invalida.'
                            })
                        }
                    } else {
                        res.statusCode = 406
                        res.send({
                            err: 'formato invalido'
                        })
                    }
                })
                .catch((err) => {
                    res.statusCode = err.response.status
                    res.send(err.response.data)
                })

        } else {
            res.statusCode = 400
            res.send({
                err: `O(s) campos ${!body.bodyVencimento
                    ? "data de vencimento, " : ''}${!body.cpf
                        ? "cpf, " : ''}${!body.valor
                            ? "valor " : ''}não foram informados.`
            })
        }
    }

    async getCobranca(req, res) {
        let body = req.body
        if (body) {

            const cobrancas = firebasedb.collection(db, 'cobrancas')
            let query = []
            if (body.cpf) {
                query = firebasedb.query(cobrancas, firebasedb.where("cpf", "==", body.cpf))
            }
            if (body.valor) {
                query = firebasedb.query(query, firebasedb.where("valor", "==", body.valor))
            }
            if (body.dataVencimento) {
                query = firebasedb.query(query, firebasedb.where("valor", "==", body.dataVencimento))
            }
            const querySnapshot = await firebasedb.getDocs(query);
            let busca = []
            querySnapshot.forEach((doc) => {
                busca.push(doc.data())
            })
            res.statusCode = 200
            res.send({
                resultados: {
                    data: busca
                }
            })

        } else {
            res.statusCode = 400
            res.send({
                err: "Pelo menos um parametro deve ser informado"
            })
        }
    }

    async mapReduce(req, res) {
        let totalPorEstado = []
        for (var estado in estados.UF) {
            totalPorEstado.push(0)
            await axios.get('http://localhost:9000/clientes/consulta', {
                    params: {
                        estado: estados.UF[estado].nome,
                        page: 1,
                        perPage: 20000
                    }
                })
                .then(async (response) => {
                    const cobrancas = firebasedb.collection(db, 'cobrancas')
                    let query = []
                    for (let i in response.data.resultados.data) {
                        query = firebasedb.query(cobrancas, firebasedb.where("cpf", "==", response.data.resultados.data[i].cpf))
                        const querySnapshot = await firebasedb.getDocs(query);
                        querySnapshot.forEach((doc) => {
                            totalPorEstado[estado] += doc.data().valor
                        })
                    }


                    res.statusCode = 200
                    res.send({
                        resultados: {
                            data: busca
                        }
                    })
                })
        }


    }
}

module.exports = new CobrancasController()