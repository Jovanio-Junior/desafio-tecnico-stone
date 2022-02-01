const firebasedb = require('firebase/firestore')

async function gerarRelatorio(cobrancas, cpf) {

    let valor = 0
    const query = firebasedb.query(cobrancas, firebasedb.where("cpf", "==", cpf))

    const querySnapshot = await firebasedb.getDocs(query);
    querySnapshot.forEach((doc) => {
        valor = valor + doc.data().valor
    })

    return valor
}

module.exports = gerarRelatorio