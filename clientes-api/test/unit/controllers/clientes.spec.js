const {
    expect
} = require('chai')
let chai = require('chai')
let chaiHttp = require('chai-http')
const {
    execMap
} = require('nodemon/lib/config/defaults')
let app = require('../../../index')
let should = chai.should()
let knex = require('../../../src/config/knex/knex')

chai.use(chaiHttp)
const clienteA = {
    nome: 'jovanio',
    estado: "Goias",
    cpf: "70218152124"
}
beforeEach((done) => {
    knex('clientes')
        .del()
        .where({
            cpf: clienteA.cpf
        })
        .then()

    knex('clientes')
        .insert({
            nome: "junior",
            estado: "Goias",
            cpf: "83918310191"
        })
        .then()
    done()
})


describe('POST /clientes/cadastro create', () => {

    context('quando passa todo objeto cliente', () => {
        context('CPF com tamanho correto', () => {
            context('CPF valido', () => {
                context('usuario não cadastrado', () => {
                    it('cadastra cpf e retorna objeto', (done) => {
                        chai.request(app)
                            .post('/clientes/cadastro')
                            .send(clienteA)
                            .end((err, res) => {
                                expect(res).to.have.status(201)
                                expect(res).to.be.an('object')
                                expect(res.body).to.have.property('success', `Usuario ${clienteA.nome} adicionado com sucesso.`)
                                done()
                            })
                    })
                })
                context('usuario ja cadastrado', () => {
                    it('retorna erro 409', (done) => {
                        chai.request(app)
                            .post('/clientes/cadastro')
                            .send({
                                nome: "junior",
                                estado: "Goias",
                                cpf: "83918310191"
                            })
                            .end((err, res) => {
                                expect(res).to.have.status(409)
                                expect(res).to.be.an('object')
                                expect(res.body).to.have.property('err', 'Usuario ja cadastrado.')
                                done()
                            })
                    })
                })
            })
            context('CPF invalido', () => {
                it('retorna erro 406', () => {
                    chai.request(app)
                        .post('/clientes/cadastro')
                        .send({
                            nome: 'teste',
                            estado: 'Goias',
                            cpf: "12345678912"
                        })
                        .end((err, res) => {
                            expect(res).to.have.status(406)
                            expect(res).to.be.an('object')
                            expect(res.body).to.have.property('err', 'CPF invalido.')
                        })
                })
            })
        })
        context('CPF com tamanho incorreto', () => {
            it('retorna erro 406', () => {
                chai.request(app)
                    .post('/clientes/cadastro')
                    .send({
                        nome: 'teste',
                        estado: 'Goias',
                        cpf: "123"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(406)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('err', 'CPF invalido.')
                    })
            })
        })
    })
    context('quando não passa ou passa o objeto cliente faltando campos', () => {
        it('retorna erro 400', () => {
            chai.request(app)
                .post('/clientes/cadastro')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('err', 'O(s) campos Nome, Estado, CPF não foram informadas.')
                })
        })
    })
})

describe('GET /clientes/consulta consultaCPF', () => {
    context('quando CPF é passado', () => {
        context('quando passa CPF valido', () => {
            it('retorna objeto', (done) => {
                chai.request(app)
                    .get('/clientes/consulta')
                    .send({
                        cpf: "83918310191"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('localizado', true)
                        expect(res.body).to.have.property('nome')
                        expect(res.body).to.have.property('estado')
                        done()
                    })
            })
        })
        context('quando passa CPF não cadastrado', () => {
            it('retorna erro 404', (done) => {
                chai.request(app)
                    .get('/clientes/consulta')
                    .send({
                        cpf: "00000000000"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(404)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('localizado', false)
                        expect(res.body).to.have.property('err', "Usuario não localizado")
                        done()
                    })
            })
        })
        context('quando passa CPF invalido', () => {
            it('retorna erro 406', (done) => {
                chai.request(app)
                    .get('/clientes/consulta')
                    .send({
                        cpf: "123"
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(406)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('err', 'CPF invalido.')
                        done()
                    })
            })
        })
    })
    context('quando CPF não é passado', () => {
        it('retorna erro 400', (done) => {
            chai.request(app)
                .get('/clientes/consulta')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('err', 'O CPF não foi informado.')
                    done()
                })
        })
    })
})

describe('GET /clientes/consulta consultaEstado', () => {
    context('quando passa estado', () => {
        it('retorna array de objetos', (done) => {
            let estado = 'Goias'
            chai.request(app)
                .get(`/clientes/consulta/${estado}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('resultados')
                    expect(res.body.resultados).to.be.an('object')
                    expect(res.body.resultados).to.have.property('data')
                    expect(res.body.resultados.data).to.be.an('array')
                    expect(res.body.resultados).to.have.property('pagination')
                    expect(res.body.resultados.pagination).to.be.an('object')
                    done()
                })
        })
    })
    context('quando não passa estado', () => {
        it('retorna erro 400', () => {
            chai.request(app)
                .get('/clientes/consulta')
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res).to.be.an('object')
                })
        })
    })
})