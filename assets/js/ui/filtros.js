/**
 * filtros.js
 * Filtra os resultados já calculados (sem recomputar compatibilidade),
 * por modalidade e/ou classificação, e repassa a lista filtrada ao callback.
 */

let resultadosAtuais = [];
let aoFiltrar = null;

// Chamado pelo main.js sempre que uma nova análise é executada
export function definirResultados(resultados, callback) {
  resultadosAtuais = resultados;
  aoFiltrar = callback;
  aplicarFiltros();
}

export function inicializarFiltros() {
  document.getElementById("filtroModalidade").addEventListener("change", aplicarFiltros);
  document.getElementById("filtroClassificacao").addEventListener("change", aplicarFiltros);
}

function aplicarFiltros() {
  if (!aoFiltrar) return;

  const modalidade = document.getElementById("filtroModalidade").value;
  const classificacao = document.getElementById("filtroClassificacao").value;

  // FILTER — combina os dois critérios selecionados pelo usuário
  const filtrados = resultadosAtuais.filter((resultado) => {
    const passaModalidade = modalidade === "todas" || resultado.modalidade === modalidade;
    const passaClassificacao = classificacao === "todas" || resultado.classificacao === classificacao;
    return passaModalidade && passaClassificacao;
  });

  aoFiltrar(filtrados);
}
