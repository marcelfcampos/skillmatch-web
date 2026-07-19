/**
 * Candidato.js
 * Representa o perfil profissional preenchido pelo usuário no formulário.
 */
export class Candidato {
  constructor({ nome = "", area = "", habilidades = [], experienciaMeses = 0 } = {}) {
    this.nome = nome;
    this.area = area;
    this.habilidades = habilidades;
    this.experienciaMeses = experienciaMeses;
  }

  // Validação mínima usada antes de salvar/analisar o perfil
  valido() {
    return Boolean(this.nome.trim()) && Boolean(this.area.trim()) && this.habilidades.length > 0;
  }
}
