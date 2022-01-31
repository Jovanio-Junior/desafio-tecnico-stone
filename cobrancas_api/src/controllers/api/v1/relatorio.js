async function gerarRelatorio(query, cpf) {
    const valor = 0
                        query = firebasedb.query(cobrancas, firebasedb.where("cpf", "==", cpf))
                        const querySnapshot = await firebasedb.getDocs(query);
                        querySnapshot.forEach((doc) => {
                            valor += doc.data().valor
                        })
                        return valor
}

module.exports = gerarRelatorio