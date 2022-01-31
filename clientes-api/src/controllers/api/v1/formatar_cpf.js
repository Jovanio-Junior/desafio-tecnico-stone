function formataCpfCadastro(cpf) {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{2})(\d{2})(\d{2})(\d{1})/, "$1$2$3$4");
}

function formataCpfConsulta(cpf) {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

module.exports = {
  formataCpfCadastro,
  formataCpfConsulta
}