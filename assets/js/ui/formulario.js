/**
 * formulario.js
 * Lida com o formulário de perfil: preenche a partir do localStorage,
 * valida e salva um novo Candidato ao submeter.
 */
import { Candidato } from "../motor/Candidato.js";
import { salvarCandidato, obterCandidato } from "../services/storage.js";

function parseHabilidades(valorBruto) {
  return valorBruto
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter(Boolean);
}

// Lê o perfil salvo (se existir) e devolve uma instância de Candidato
export function obterCandidatoAtual() {
  const salvo = obterCandidato();
  return salvo ? new Candidato(salvo) : null;
}

// Preenche os campos do formulário com o perfil salvo, se houver
export function preencherFormulario() {
  const candidato = obterCandidatoAtual();
  if (!candidato) return null;

  document.getElementById("campoNome").value = candidato.nome;
  document.getElementById("campoArea").value = candidato.area;
  document.getElementById("campoHabilidades").value = candidato.habilidades.join(", ");
  document.getElementById("campoExperiencia").value = candidato.experienciaMeses;

  return candidato;
}

export function inicializarFormulario(aoSalvar) {
  const form = document.getElementById("formPerfil");
  const mensagem = document.getElementById("formMensagem");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("campoNome").value.trim();
    const area = document.getElementById("campoArea").value.trim();
    const habilidades = parseHabilidades(document.getElementById("campoHabilidades").value);
    const experienciaMeses = Number(document.getElementById("campoExperiencia").value) || 0;

    const candidato = new Candidato({ nome, area, habilidades, experienciaMeses });

    if (!candidato.valido()) {
      mensagem.textContent = "Preencha nome, área e ao menos uma habilidade antes de continuar.";
      mensagem.dataset.status = "erro";
      return;
    }

    salvarCandidato(candidato);
    mensagem.textContent = `Perfil de ${candidato.nome} salvo com sucesso.`;
    mensagem.dataset.status = "sucesso";

    aoSalvar(candidato);
  });
}
