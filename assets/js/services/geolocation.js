/**
 * geolocation.js
 * Serviço opcional: usa a Geolocation API do navegador (com permissão do
 * usuário) para dar um contexto extra sobre vagas remotas x presenciais.
 * Falha de forma silenciosa (retorna null) caso não haja suporte, permissão
 * ou conexão — nunca bloqueia o fluxo principal da aplicação.
 */

function obterCoordenadas() {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (posicao) => resolve({ latitude: posicao.coords.latitude, longitude: posicao.coords.longitude }),
      () => resolve(null),
      { timeout: 5000 }
    );
  });
}

export async function obterCidadeAproximada() {
  const coordenadas = await obterCoordenadas();
  if (!coordenadas) return null;

  try {
    const resposta = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}&localityLanguage=pt`
    );
    if (!resposta.ok) return null;

    const dados = await resposta.json();
    return dados.city || dados.locality || null;
  } catch {
    return null;
  }
}
