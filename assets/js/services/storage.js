/**
 * storage.js
 * Camada de persistência local (localStorage): perfil do candidato,
 * histórico de análises e preferência de tema.
 */

const CHAVE_CANDIDATO = "skillmatch:candidato";
const CHAVE_HISTORICO = "skillmatch:historico";
const CHAVE_TEMA = "skillmatch:tema";

export function salvarCandidato(candidato) {
  try {
    localStorage.setItem(CHAVE_CANDIDATO, JSON.stringify(candidato));
  } catch (erro) {
    console.warn("Não foi possível salvar o perfil:", erro);
  }
}

export function obterCandidato() {
  try {
    const bruto = localStorage.getItem(CHAVE_CANDIDATO);
    return bruto ? JSON.parse(bruto) : null;
  } catch (erro) {
    console.warn("Não foi possível ler o perfil salvo:", erro);
    return null;
  }
}

export function salvarHistorico(entrada) {
  try {
    const historico = obterHistorico();
    historico.push(entrada);
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
  } catch (erro) {
    console.warn("Não foi possível salvar o histórico:", erro);
  }
}

export function obterHistorico() {
  try {
    const bruto = localStorage.getItem(CHAVE_HISTORICO);
    return bruto ? JSON.parse(bruto) : [];
  } catch (erro) {
    console.warn("Não foi possível ler o histórico:", erro);
    return [];
  }
}

export function salvarTema(tema) {
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch (erro) {
    console.warn("Não foi possível salvar o tema:", erro);
  }
}

export function obterTema() {
  try {
    return localStorage.getItem(CHAVE_TEMA);
  } catch (erro) {
    console.warn("Não foi possível ler o tema salvo:", erro);
    return null;
  }
}
