const {
    expect
} = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../../index')
chai.use(chaiHttp)
const axios = require('axios')
const {
    send
} = require('express/lib/response')

describe('POST /cobranca/cadatro create', () => {
    context('quando passa todo o objeto cobranca', () => {
        context('cpf valido - api clientes', () => {
            context('data valida', () => {
                it('verificar cpf - api clites', (done) => {
                    chai.request(app)
                        .post('/cobranca/cadastro')
                        .send({
                            cpf: "83918310191",
                            valor: 8391,
                            dataVencimento: "10/01/2035"
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(201)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('success')
                            done()
                        })
                })
            })
            context('data invalida', () => {
                it('retorna erro 406', (done) => {

                    chai.request(app)
                        .post('/cobranca/cadastro')
                        .send({
                            cpf: "83918310191",
                            valor: 8391,
                            dataVencimento: "10/01/2002"
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(406)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('err')
                            done()
                        })
                })
            })
        })
        context('formato invalido', () => {
            it('retorna erro 406', (done) => {
                axios.post('http://localhost:9000/clientes/consulta', {
                        cpf: "83918310191"
                    })
                    .catch(err => {
                        chai.request(app)
                            .post('/cobranca/cadastro')
                            .send({
                                cpf: 83918310191,
                                valor: "8391",
                                dataVencimento: 10 / 01 / 2002
                            })
                            .end((err, res) => {
                                expect(res).to.have.status(err.response.status)
                                expect(res).to.be.an('object')
                                expect(res.body).to.have.property('err')

                            })
                    })
                done()

            })
        })
        context('cpf invalido - api clientes', () => {
            it('retorna erro 406', (done) => {

                chai.request(app)
                    .post('/cobranca/cadastro')
                    .send({
                        cpf: "123",
                        valor: 8391,
                        dataVencimento: "10/01/2002"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(406)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('err')
                        done()
                    })
            })
        })
    })
    context('quando não passa todo o objeto cobranca', () => {
        it('retorna erro 400', () => {
            chai.request(app)
                .post('/cobranca/cadastro')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                })
        })
    })
})

describe('GET /cobranca/consulta consulta', () => {
    context('quando fornece ao menos 1 filtro', () => {
        it('retorna busca no banco', (done) => {
            chai.request(app)
                .get('/cobranca/consulta/?cpf=83918310191')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('resultados')
                    expect(res.body.resultados).to.have.property('data')
                    done()
                })
        })
    })
    context('quando não passa nenhum filtro', () => {
        it('retorna erro 400', () => {
            chai.request(app)
                .get('/cobranca/consulta')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('err', 'Pelo menos um parametro deve ser informado')
                })
        })
    })
})