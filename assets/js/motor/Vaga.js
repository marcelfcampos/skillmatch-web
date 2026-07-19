/**
 * Vaga.js
 * Classe-mãe que representa uma vaga de emprego genérica.
 */
export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Método que usa `this` para montar um resumo da vaga
  exibirResumo() {
    return `${this.cargo} — ${this.empresa}`;
  }

  // EVERY — verifica se o candidato atende a todos os requisitos da vaga
  candidatoAtendeTudo(habilidadesCandidato) {
    return this.requisitos.every((requisito) => habilidadesCandidato.includes(requisito));
  }
}
