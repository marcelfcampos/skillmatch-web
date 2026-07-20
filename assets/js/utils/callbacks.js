/**
 * callbacks.js
 * `executarAnalise` recebe uma função como parâmetro (callback) e a invoca
 * ao final do processamento, repassando o dado relevante.
 */
export function executarAnalise(nomeCandidato, callback) {
  // callback — função executada somente após a análise terminar
  callback(nomeCandidato);
}
