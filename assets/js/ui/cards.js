/**
 * cards.js
 * Renderização no DOM: tabela de vagas analisadas, card de melhor match,
 * painel do candidato e estados de carregamento.
 */

function fillClass(percentual) {
  return percentual >= 80 ? "f-alta" : percentual >= 50 ? "f-media" : "f-baixa";
}

function badgeClass(classificacao) {
  return classificacao === "Alta" ? "b-alta" : classificacao === "Média" ? "b-media" : "b-baixa";
}

export function renderTabela(resultados) {
  const tbody = document.getElementById("tableBody");

  if (!resultados.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="mono">Nenhuma vaga corresponde aos filtros selecionados.</td></tr>`;
    return;
  }

  tbody.innerHTML = resultados
    .map(
      (r) => `
    <tr>
      <td><div class="co">${r.empresa}</div><div class="ca">${r.vaga}</div></td>
      <td><span class="mono">${r.modalidade}</span></td>
      <td>
        <div class="pct">${r.percentual}%</div>
        <div class="bar"><div class="fill ${fillClass(r.percentual)}" data-w="${r.percentual}"></div></div>
      </td>
      <td>
        <div class="skills">
          ${r.habilidadesEncontradas.map((s) => `<span class="sk sk-ok">${s}</span>`).join("")}
          ${r.habilidadesFaltantes.map((s) => `<span class="sk sk-no">${s}</span>`).join("")}
        </div>
      </td>
      <td><span class="badge ${badgeClass(r.classificacao)}">${r.classificacao}</span></td>
      <td><span class="mono">R$ ${Number(r.salario).toLocaleString("pt-BR")}</span></td>
    </tr>
  `
    )
    .join("");
}

export function renderBest(melhor) {
  document.getElementById("bestCo").textContent = melhor.empresa;
  document.getElementById("bestCa").textContent = melhor.vaga;
  document.getElementById("bestPct").textContent = melhor.percentual;
  document.getElementById("bestDesc").textContent =
    `A ${melhor.empresa} apresenta maior aderência ao perfil atual do candidato.`;

  const fill = document.getElementById("bestFill");
  fill.style.width = "0";
  setTimeout(() => {
    fill.style.width = melhor.percentual + "%";
  }, 100);

  const recs = document.getElementById("recItems");
  recs.innerHTML = melhor.habilidadesFaltantes.length
    ? melhor.habilidadesFaltantes.map((s) => `<div class="rec-item">Estude: ${s}</div>`).join("")
    : '<div class="rec-item">Perfil completo para esta vaga!</div>';

  document.getElementById("bestMeta").innerHTML = `
    <div class="bm"><span>Salário</span><strong>R$ ${Number(melhor.salario).toLocaleString("pt-BR")}/mês</strong></div>
    <div class="bm"><span>Modalidade</span><strong>${melhor.modalidade}</strong></div>
    <div class="bm"><span>Nível</span><strong>${melhor.senioridade ?? "—"}</strong></div>
  `;
}

export function renderCandidato(candidato) {
  document.getElementById("candNome").textContent = candidato.nome;
  document.getElementById("candArea").textContent = candidato.area;
  document.getElementById("candExperiencia").textContent = `${candidato.experienciaMeses} meses`;
  document.getElementById("candHabilidadesQtd").textContent = `${candidato.habilidades.length} mapeadas`;

  document.getElementById("candSkills").innerHTML = candidato.habilidades
    .map((h) => `<span class="csk">${h}</span>`)
    .join("");
}

export function renderNotaLocalizacao(cidade) {
  const nota = document.getElementById("notaLocalizacao");
  nota.textContent = cidade
    ? `Detectamos que você pode estar perto de ${cidade}. As vagas remotas abaixo também podem ser uma boa opção.`
    : "";
}

export function mostrarCarregando() {
  document.getElementById("runBtn").disabled = true;
  document.getElementById("loading").style.display = "block";
  document.getElementById("results-section").style.display = "none";
}

export function esconderCarregando() {
  document.getElementById("loading").style.display = "none";
}

export function exibirResultados(quantidadeVagas) {
  document.getElementById("vagasCount").textContent = `${quantidadeVagas} oportunidades`;
  document.getElementById("results-section").style.display = "block";

  requestAnimationFrame(() => {
    document.querySelectorAll(".fill[data-w]").forEach((el) => {
      el.style.width = el.getAttribute("data-w") + "%";
    });
  });
}

export function resetarBotao() {
  const btn = document.getElementById("runBtn");
  btn.textContent = "↺ Executar novamente";
  btn.disabled = false;
}

export function rolarParaResultados() {
  document.getElementById("vagas").scrollIntoView({ behavior: "smooth" });
}
