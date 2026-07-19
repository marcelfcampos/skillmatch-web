/**
 * api.js
 * Serviço responsável por buscar o catálogo de vagas via fetch.
 */
import { VagaFrontend } from "../motor/VagaFrontend.js";

const CAMINHO_VAGAS = "./assets/dados/vagas.json";

export async function buscarVagas() {
  const resposta = await fetch(CAMINHO_VAGAS);

  if (!resposta.ok) {
    throw new Error(`Falha ao carregar vagas (HTTP ${resposta.status})`);
  }

  const dadosBrutos = await resposta.json();

  // MAP — transforma cada objeto simples do JSON em uma instância de VagaFrontend
  return dadosBrutos.map(
    (v) => new VagaFrontend(v.id, v.empresa, v.cargo, v.requisitos, v.salario, v.modalidade, v.stack, v.senioridade)
  );
}
