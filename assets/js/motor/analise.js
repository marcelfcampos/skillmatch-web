/**
 * analise.js
 * Núcleo de cálculo do SkillMatch: compatibilidade, classificação e melhor vaga.
 */

export function analisarVaga(candidato, vaga) {
  const totalDeRequisitos = vaga.requisitos.length;

  // FILTER — habilidades do requisito que o candidato já possui
  const habilidadesEncontradas = vaga.requisitos.filter((req) => candidato.habilidades.includes(req));
  // FILTER — habilidades do requisito que o candidato ainda não possui
  const habilidadesFaltantes = vaga.requisitos.filter((req) => !candidato.habilidades.includes(req));

  const percentual = Math.round((habilidadesEncontradas.length / totalDeRequisitos) * 100);
  const classificacao = classificarPercentual(percentual);

  return {
    vagaRef: vaga,
    vaga: vaga.exibirResumo(),
    id: vaga.id,
    empresa: vaga.empresa,
    cargo: vaga.cargo,
    salario: vaga.salario,
    modalidade: vaga.modalidade,
    senioridade: vaga.senioridade ?? null,
    percentual,
    habilidadesEncontradas,
    habilidadesFaltantes,
    classificacao,
  };
}

// Classificação por faixa de percentual (switch sobre condições)
function classificarPercentual(percentual) {
  switch (true) {
    case percentual >= 80:
      return "Alta";
    case percentual >= 50:
      return "Média";
    default:
      return "Baixa";
  }
}

// REDUCE — encontra a vaga com maior percentual de compatibilidade
export function encontrarMelhorVaga(resultados) {
  return resultados.reduce((maior, atual) => (atual.percentual > maior.percentual ? atual : maior));
}

// FIND — localiza a vaga original (instância) a partir do id do resultado
export function buscarVagaPorId(vagas, id) {
  return vagas.find((vaga) => vaga.id === id) || null;
}
