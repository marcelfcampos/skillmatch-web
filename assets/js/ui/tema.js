/**
 * tema.js
 * Alterna entre tema claro e escuro (via atributo data-theme na raiz do
 * documento) e lembra a preferência do usuário no localStorage.
 */
import { salvarTema, obterTema } from "../services/storage.js";

const TEMA_CLARO = "light";
const TEMA_ESCURO = "dark";

export function inicializarTema() {
  aplicarTema(obterTema() || TEMA_CLARO);

  document.getElementById("temaBtn").addEventListener("click", () => {
    const atual = document.documentElement.getAttribute("data-theme") || TEMA_CLARO;
    const proximo = atual === TEMA_CLARO ? TEMA_ESCURO : TEMA_CLARO;
    aplicarTema(proximo);
    salvarTema(proximo);
  });
}

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);

  const botao = document.getElementById("temaBtn");
  const escuro = tema === TEMA_ESCURO;
  botao.textContent = escuro ? "☀️ Tema claro" : "🌙 Tema escuro";
  botao.setAttribute("aria-pressed", String(escuro));
}
