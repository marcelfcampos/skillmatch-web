/**
 * main.js
 * Ponto de entrada da aplicação (carregado como <script type="module">).
 * Orquestra o formulário de perfil, a busca de vagas, o motor de análise
 * e a atualização da interface.
 */
import { buscarVagas } from "./services/api.js";
import { salvarHistorico } from "./services/storage.js";
import { obterCidadeAproximada } from "./services/geolocation.js";
import { analisarVaga, encontrarMelhorVaga, buscarVagaPorId } from "./motor/analise.js";
import { contadorAnalises } from "./utils/closures.js";
import { executarAnalise as notificarConclusao } from "./utils/callbacks.js";
import { inicializarFormulario, preencherFormulario, obterCandidatoAtual } from "./ui/formulario.js";
import { inicializarFiltros, definirResultados } from "./ui/filtros.js";
import { inicializarTema } from "./ui/tema.js";
import {
  renderTabela,
  renderBest,
  renderCandidato,
  renderNotaLocalizacao,
  mostrarCarregando,
  esconderCarregando,
  exibirResultados,
  resetarBotao,
  rolarParaResultados,
} from "./ui/cards.js";

let vagasCache = [];

async function rodarAnalise(candidato) {
  mostrarCarregando();

  try {
    if (!vagasCache.length) {
      vagasCache = await buscarVagas();
    }

    // MAP — gera a lista de resultados processados
    const resultados = vagasCache.map((vaga) => analisarVaga(candidato, vaga));
    const melhor = encontrarMelhorVaga(resultados);

    esconderCarregando();
    renderCandidato(candidato);
    renderTabela(resultados);
    renderBest(melhor);
    exibirResultados(resultados.length);
    definirResultados(resultados, renderTabela);

    salvarHistorico({ empresa: melhor.empresa, percentual: melhor.percentual, data: new Date().toISOString() });

    const vagaObj = buscarVagaPorId(vagasCache, melhor.id);
    const atendeTudo = vagaObj?.candidatoAtendeTudo(candidato.habilidades) ?? false;

    const idAnalise = contadorAnalises();
    console.log(`Análise #${idAnalise}: ${resultados.length} vagas analisadas.`);
    console.log(`Candidato atende todos os requisitos da melhor vaga? ${atendeTudo ? "Sim ✓" : "Não ✗"}`);

    notificarConclusao(candidato.nome, (nome) => {
      console.log(`✅ Análise concluída com sucesso para o candidato: ${nome}.`);
    });

    rolarParaResultados();
  } catch (erro) {
    esconderCarregando();
    console.error("Erro ao executar a análise:", erro);
    alert("Não foi possível carregar as vagas. Tente novamente em instantes.");
  } finally {
    resetarBotao();
  }
}

function iniciar() {
  inicializarTema();
  inicializarFiltros();

  const candidatoSalvo = preencherFormulario();
  inicializarFormulario((candidato) => rodarAnalise(candidato));

  document.getElementById("runBtn").addEventListener("click", () => {
    const candidato = obterCandidatoAtual();
    if (!candidato || !candidato.valido()) {
      alert("Preencha e salve seu perfil antes de executar a análise.");
      return;
    }
    rodarAnalise(candidato);
  });

  // Geolocalização é totalmente opcional: nunca bloqueia o restante do fluxo
  obterCidadeAproximada()
    .then(renderNotaLocalizacao)
    .catch(() => {});

  if (candidatoSalvo?.valido()) {
    rodarAnalise(candidatoSalvo);
  }
}

document.addEventListener("DOMContentLoaded", iniciar);
