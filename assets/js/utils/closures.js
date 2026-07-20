/**
 * closures.js
 * Closure clássica: `criarContador` fecha sobre `total` e devolve uma função
 * que o incrementa a cada chamada, sem expor a variável ao escopo global.
 */
export function criarContador() {
  let total = 0;
  return function contar() {
    total += 1;
    return total;
  };
}

// Instância única usada durante toda a sessão do usuário
export const contadorAnalises = criarContador();
