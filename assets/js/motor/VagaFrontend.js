/**
 * VagaFrontend.js
 * Classe filha especializada em vagas de Front-End: adiciona `stack` e
 * `senioridade`, além de um peso extra para tecnologias mais valorizadas.
 */
import { Vaga } from "./Vaga.js";

// Peso adicional dado a determinadas habilidades quando aparecem na stack da vaga
const PESO_HABILIDADE = {
  React: 1.15,
  TypeScript: 1.1,
  Acessibilidade: 1.05,
};

export class VagaFrontend extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, stack = [], senioridade = "Júnior") {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.stack = stack;
    this.senioridade = senioridade;
  }

  // Sobrescreve o resumo herdado da classe-mãe, incluindo a senioridade
  exibirResumo() {
    return `${this.cargo} (${this.senioridade}) — ${this.empresa}`;
  }

  // Peso extra de uma habilidade específica dentro da stack desta vaga
  pesoDaHabilidade(habilidade) {
    return PESO_HABILIDADE[habilidade] ?? 1;
  }
}
