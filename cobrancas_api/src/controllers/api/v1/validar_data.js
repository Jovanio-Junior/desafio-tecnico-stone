function valida(data1, data2) {




    if (data1.getFullYear() <= dataVencimento.getFullYear()) {
        if (data1.getMonth() <= dataVencimento.getMonth()) {
            if (data1.getDate() <= dataVencimento.getDate()) {
                return true
            } else {
                if (data1.getMonth() < dataVencimento.getMonth()) {
                    return true
                }
            }
        }
    }
    return false
}

module.exports = valida