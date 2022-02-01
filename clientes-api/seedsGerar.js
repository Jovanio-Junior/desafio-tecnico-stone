let {
    generate
} = require('gerador-validador-cpf')
let {
    geradorNome
} = require('gerador-nome')
let estados = require('./estados.json')
const {
    json
} = require('body-parser')
let numero = Math.floor(Math.random() * (10000 - 1000) + 1000)
var seed = new Set()
var jsonSeed = []
for (let i = 0; i < numero; i++) {
    let cpf = generate()
    let found = Array.from(seed).find(e => e.cpf == cpf)
    if (!found) {
        indiceEstado = Math.floor(Math.random() * (27 - 1) + 1)
        seed.add(cpf)
        jsonSeed.push({
            cpf: cpf,
            nome: geradorNome(),
            estado: estados.UF[indiceEstado].nome
        })
    }
}

for (let j in seed) {
    jsonSeed.push(seed[j])
}

module.exports = jsonSeed