# SkillMatch JS

O SkillMatch JS é uma aplicação web desenvolvida com HTML, CSS e JavaScript puro que analisa o perfil técnico de um candidato, compara suas habilidades com vagas de Front-End e apresenta a compatibilidade, recomendações de estudo e a oportunidade mais adequada ao usuário.

## Sobre o Projeto

O **SkillMatch JS** analisa o perfil técnico informado pelo próprio usuário — através de um formulário — e o compara com os requisitos de vagas reais de Front-End carregadas de um catálogo em JSON, calculando compatibilidade, classificando as vagas e recomendando o que estudar para chegar a 100%.

#### O projeto realiza:

- Coleta e valida os dados do candidato por meio de um formulário.
- Salva o perfil no navegador utilizando localStorage.
- Busca o catálogo de vagas em um arquivo JSON usando fetch.
- Calcula a porcentagem de compatibilidade entre o candidato e cada vaga.
- Identifica quais habilidades o candidato já possui e quais ainda precisa desenvolver.
- Classifica as vagas em níveis de compatibilidade (alta, média ou baixa).
- Determina automaticamente a vaga com maior aderência ao perfil.
- Gera recomendações de estudo para aumentar a compatibilidade.
- Permite filtrar as vagas por modalidade e classificação.
- Alterna entre tema claro e escuro, mantendo a preferência do usuário.
- Utiliza geolocalização para fornecer contexto sobre vagas presenciais e remotas.
- Exibe os resultados em uma interface responsiva e acessível.

## O que mudou nesta versão

Esta é uma reestruturação completa do projeto original (que tinha um candidato fixo, "Marcel", e uma estrutura de arquivos mais simples). As principais mudanças:

| Antes | Agora |
|---|---|
| Candidato fixo no código (`Marcel`) | **Formulário de perfil** editável, validado e salvo em `localStorage` |
| Um único `motor.js` | Motor dividido em `Candidato`, `Vaga`, `VagaFrontend` e `analise.js` |
| Um único `style.css` | CSS dividido em `theme.css`, `style.css` e `responsive.css` |
| Sem filtros | Filtro por **modalidade** e por **classificação de compatibilidade** |
| Tema único | **Alternância de tema claro/escuro**, persistida em `localStorage` |
| Sem geolocalização | **Geolocalização** para dar contexto sobre remoto x presencial |
| — | `package.json` com script `npm start` |

## Estrutura do projeto

```
skillmatch-web/
├── index.html
├── README.md
├── package.json
├── .gitignore
└── assets/
    ├── css/
    │   ├── theme.css           # variáveis de cor (tema claro/escuro)
    │   ├── style.css           # layout e componentes
    │   └── responsive.css      # ajustes mobile-first por breakpoint
    ├── dados/
    │   └── vagas.json          # catálogo de vagas (fetch)
    ├── img/
    │   └── logo.svg
    └── js/
        ├── main.js             # ponto de entrada (<script type="module">)
        ├── motor/
        │   ├── Candidato.js    # classe do perfil do candidato
        │   ├── Vaga.js         # classe-mãe
        │   ├── VagaFrontend.js # classe filha (herança)
        │   └── analise.js      # cálculo de compatibilidade (map/filter/find/every/reduce)
        ├── services/
        │   ├── api.js          # fetch do catálogo de vagas
        │   ├── storage.js      # localStorage (perfil, histórico, tema)
        │   └── geolocation.js  # geolocalização opcional (Geolocation API)
        ├── ui/
        │   ├── formulario.js   # formulário de perfil (validação, submit)
        │   ├── cards.js        # renderização da tabela e do melhor match
        │   ├── filtros.js      # filtros de modalidade/classificação
        │   └── tema.js         # alternância de tema claro/escuro
        └── utils/
            ├── callbacks.js    # callback de finalização da análise
            └── closures.js     # closure — contador de análises da sessão
```

## Como Executar

> O projeto usa `fetch` para carregar `assets/dados/vagas.json`, então precisa ser servido por um servidor local — abrir o `index.html` direto via `file://` bloqueia o `fetch` por política de CORS do navegador.

```bash
npm start
```

ou, sem instalar nada:

```bash
npx serve .
```

Depois acesse o endereço exibido no terminal (ex: `http://localhost:3000`).

### Passo a passo na interface

1. Preencha o formulário **"Seu perfil profissional"** (nome, área, habilidades separadas por vírgula e experiência em meses) e clique em **"Salvar perfil e analisar"**.
2. O perfil é validado, salvo no navegador (`localStorage`) e a análise roda automaticamente.
3. Use os filtros de **modalidade** e **compatibilidade** para refinar a lista de vagas exibidas.
4. Clique em **"Alternar tema"** no menu para trocar entre claro e escuro — a preferência é lembrada na próxima visita.
5. Ao recarregar a página, seu perfil salvo é recarregado automaticamente e a análise é refeita.

## Requisitos incorporados

### Motor SkillMatch

- **Perfil do candidato**: classe `Candidato` (`motor/Candidato.js`), preenchida pelo formulário, salva e recuperada via `localStorage` (`services/storage.js`).

- **Catálogo de vagas**: `assets/dados/vagas.json` com 5 vagas, cada uma com `id`, `empresa`, `cargo`, `requisitos`, `salario` e `modalidade`. Carregado com `fetch` + `async/await` em `services/api.js`.

- **Compatibilidade**: `(requisitos atendidos / total) * 100`, com separação de habilidades encontradas/faltantes (`motor/analise.js`).

- **Classificação**: Alta (80–100%), Média (50–79%), Baixa (0–49%) via `switch` sobre condições.

- **Melhor vaga**: `encontrarMelhorVaga` usa `reduce` para achar a maior compatibilidade e gera recomendação de estudo a partir das habilidades faltantes.

- **Métodos de array**: `map` (transformar vagas e gerar resultados), `filter` (habilidades encontradas/faltantes, filtros de UI), `find` (`buscarVagaPorId`), `every` (`Vaga.candidatoAtendeTudo`), `reduce` (melhor vaga) — todos comentados no código indicando onde são usados.

- **POO**: `class Vaga` (construtor, atributos, método `exibirResumo()` usando `this`) e `class VagaFrontend extends Vaga`, que adiciona `stack` e `senioridade`, **sobrescreve** `exibirResumo()` e implementa `pesoDaHabilidade()` (peso extra para tecnologias como React/TypeScript).

- **Callback**: `utils/callbacks.js` exporta `executarAnalise(nomeCandidato, callback)`, que recebe uma função como parâmetro e a executa ao final do fluxo.

- **Closure**: `utils/closures.js` exporta `criarContador()` e a instância `contadorAnalises`, usada para contar quantas análises foram feitas na sessão sem expor o contador ao escopo global.

### Interface

- **HTML semântico e acessível**: `header`, `nav`, `main`, `section`, `footer`; um único `h1` (o restante usa `h2`); todo `input` tem `label` associado via `for`/`id`; grupos de filtro usam `role="group"` + `aria-label`; foco visível (`:focus-visible`) em toda a aplicação; `lang="pt-BR"` no `<html>`; logo com `alt` descritivo; `title` e `meta description` definidos; link de "pular para o conteúdo" para navegação por teclado.

- **Formulário**: perfil do candidato com `addEventListener("submit")`, `preventDefault()`, validação (nome, área e ao menos uma habilidade obrigatórios) e mensagem de status acessível (`aria-live="polite"`).

- **Filtros**: seletores de modalidade e classificação, filtrando os resultados já calculados sem precisar buscar as vagas novamente.

- **Tema**: botão com `aria-pressed` alternando `data-theme` no `<html>`, com variáveis de cor centralizadas em `theme.css`.

- **Geolocalização**: `services/geolocation.js` pergunta a localização ao navegador (com permissão do usuário) e exibe uma nota contextual sobre vagas remotas; falha de forma silenciosa se o usuário negar ou o navegador não suportar, nunca bloqueando o restante da aplicação.

- **Responsividade**: `responsive.css` segue mobile-first, com breakpoints em `900px` e `640px`, incluindo uma tabela que vira "cards" empilhados em telas pequenas.

## Tecnologias Utilizadas

- JavaScript (ES Modules)
- HTML5 semântico
- CSS3 (mobile-first, custom properties)
- Fetch API + JSON
- Web Storage API (`localStorage`)
- Geolocation API
- VS Code
- GitHub
- GitHub Desktop
- Kanban

## Conceitos de JavaScript Aplicados

- Variáveis (`const`, `let`)
- Tipos de dados
- Condicionais (`if/else`, `switch`, ternário)
- Operadores
- Estruturas de repetição
- Funções e Arrow Functions
- Arrays e métodos de array (`map`, `filter`, `find`, `every`, `reduce`)
- Objetos
- POO, Classes e Herança
- Callbacks
- Closures
- Promises
- Async/Await
- Módulos ES (`import`/`export`)
- Fetch API
- localStorage
- Geolocation API

## Como a internet funciona

A internet funciona como uma rede global de computadores conectados entre si.

Quando um usuário acessa um site:

1. O navegador envia uma requisição;
2. O servidor recebe essa requisição;
3. O servidor retorna os dados;
4. O navegador exibe o conteúdo.

Esse modelo é conhecido como arquitetura cliente-servidor. No projeto, `services/api.js` usa `fetch` para buscar o catálogo de vagas em `assets/dados/vagas.json`, e `services/geolocation.js` faz o mesmo para obter a cidade aproximada do usuário, ambos seguindo essa arquitetura.

## Organização do Trello - (Kanban)

- Material de apoio
- Pronto para iniciar
- Desenvolvendo
- Pausado
- Concluído

## Links do Projeto

🔗 [Vercel (Deploy)](https://skillmatch-js.vercel.app/)

🔗 [Trello (Kanban)](https://trello.com/invite/b/6a138cdef4f67243b42956ac/ATTIe37fb1a53ce14355f5d31302e99152b2B8B87FED/skillmatch-js)

🔗 [Repositório GitHub](https://github.com/marcelfcampos/SKILLMATCH-JS)

## Redes Sociais

🔗 [LinkedIn](https://www.linkedin.com/in/marcelfcampos/)

🔗 [Instagram](https://www.instagram.com/arqmarcelcampos/)

🔗 [GitHub](https://github.com/marcelfcampos)

## Autor: Marcel Ferreira Campos

Formado em Arquitetura e Urbanismo, trago para a área de tecnologia a combinação entre pensamento criativo e estruturado, aplicando conceitos de design, usabilidade e lógica construtiva ao desenvolvimento de interfaces digitais.
