# Relatório de Auditoria Pós-Implementação e Revisão Técnica — Newthing (`base-app`)

> **Documento de Auditoria e Especificação Técnica para Análise e Correção pelo Codex**
> **Alvo:** `C:\Users\User\Desktop\página newthig\base-app`
> **Contexto:** Revisão completa (código estático, cascata CSS, acessibilidade, peso de build e testes multi-dispositivos em 7 resoluções) após a execução inicial de `docs/RELATORIO-MELHORIAS-CODEX.md`.

---

## 1. Resumo Executivo dos Testes Multi-Dispositivos e Funcionais

A aplicação foi validada em **7 perfis de dispositivos** (`1920×1080`, `1366×768`, `1180×820`, `768×1024`, `390×844`, `360×800` e `320×568`) e passou em `npm run lint`, `npm run typecheck` e `npm run build` sem erros de compilação ou overflow horizontal.

Contudo, uma auditoria profunda de engenharia identificou **7 categorias de problemas e regressões** que deixaram de ser analisadas ou que surgiram como efeito colateral das alterações anteriores. Este documento detalha cada item com linha exata, causa raiz e especificação de correção.

---

## 2. Lista Detalhada de Erros e Pendências para o Codex Analisar

### ITEM 1 (Alta Prioridade) — Ordem do Menu e Links de Rolagem Desalinhados com a Ordem Real das Seções no DOM

- **Arquivo afetado:** `src/App.tsx`
- **Causa raiz:** Durante a implementação da Prioridade P1.3 de `RELATORIO-MELHORIAS-CODEX.md` (*"Inverter a Ordem de Prova Visual — `ProjectShowcase` mais próximo do topo"*), o componente `<ProjectShowcase />` (`<section id="projetos">`) foi movido para a linha `565`, **antes** de `<SolutionsJourney />` (`#solucoes`, linha `566`) e da seção Como Fazemos (`#processo`, linha `572`). Porém, os menus de navegação e os links de convite de rolagem da Hero não foram atualizados.
- **Problemas específicos encontrados:**
  1. **Menu do Cabeçalho (`src/App.tsx`, linhas 443–457):**
     - Ordem atual no menu: `Início` (`#inicio`) → `Soluções` (`#solucoes`) → `Como fazemos` (`#processo`) → `Projetos` (`#projetos`) → `Quem somos` (`#quem-somos`).
     - Ordem real das seções no `<main>` (`src/App.tsx`, linhas 478–610): `Início` (`#inicio`) → **`Projetos` (`#projetos`)** → **`Soluções` (`#solucoes`)** → **`Como fazemos` (`#processo`)** → `Quem somos` (`#quem-somos`) → `Dúvidas` (`#duvidas`).
     - Além disso, o item `Dúvidas` (`#duvidas`) existe no rodapé, mas foi omitido do `<nav id="main-navigation">` do cabeçalho.
  2. **Links do Rodapé (`src/App.tsx`, linhas 643–647):**
     - Também listam `Soluções` → `Como fazemos` → `Projetos`, fora da sequência visual da página.
  3. **Barra de Anúncio do Topo (`src/App.tsx`, linhas 428–433) e Convite de Rolagem da Hero (`src/App.tsx`, linhas 529–534):**
     - Na linha `430`, o link *"Conheça as possibilidades"* aponta para `href="#solucoes"`, mas a seção cujo eyebrow é `"POSSIBILIDADES"` e que está imediatamente abaixo da Hero é `#projetos`. Ao clicar, o navegador **pula inteiramente** a seção `<ProjectShowcase />` (`#projetos`).
- **Ação recomendada para o Codex:**
  - Alinhar a ordem dos links no `<header>` e no `<footer>` com a ordem real do `<main>`: `Início` (`#inicio`), `Projetos` (`#projetos`), `Soluções` (`#solucoes`), `Como fazemos` (`#processo`), `Quem somos` (`#quem-somos`) e `Dúvidas` (`#duvidas`).
  - Atualizar o link da barra de anúncio (`linha 430`) para `href="#projetos"` (ou ajustar o fluxo conforme a seção imediatamente seguinte à Hero).

---

### ITEM 2 (Alta Prioridade) — Palavras Coladas em Quebras de Linha (`<br />`) sem Espaço Explícito no JSX

- **Arquivos afetados:** `src/components/ProjectShowcase.tsx`, `src/App.tsx`, `src/components/JourneyDemo.tsx`
- **Causa raiz:** Em JSX (React), quebras de linha e indentação adjacentes a uma tag `<br />` são removidas pelo compilador, gerando no DOM ` PalavraA<br>PalavraB` sem espaço em branco entre elas. Quando uma regra CSS aplica `br { display: none; }` em viewports menores (como em `src/components/DevicePreview.css:854`) ou quando um leitor de tela (NVDA/VoiceOver) lê o elemento de forma contínua, as duas palavras ficam grudadas.
- **Ocorrências identificadas:**
  1. `src/components/ProjectShowcase.tsx` (linhas 498–505) — *Já corrigido na auditoria:* gerava `"marcasque"` nos previews de Android e iPhone · iOS por causa de `:is([data-device='ios'], [data-device='android']) .forma-copy > p br { display: none; }`.
  2. `src/App.tsx` (linhas 616–618):
     ```tsx
     O próximo grande projeto
     <br />
     pode começar <span>com uma conversa.</span>
     ```
     Sem `{' '}` antes de `<br />`, o texto acessível torna-se `"O próximo grande projetopode começar..."`.
  3. `src/components/JourneyDemo.tsx` (linhas 244–246):
     ```tsx
     Seu próximo passo
     <br />
     <i>começa com clareza.</i>
     ```
     Sem `{' '}` antes de `<br />` (`"passocomeça"`).
  4. `src/components/JourneyDemo.tsx` (linhas 254–255):
     ```tsx
     Do interesse
     <br />à conversa certa.
     ```
     Sem `{' '}` antes de `<br />` (`"interesseà"`).
  5. `src/components/JourneyDemo.tsx` (linhas 291–298):
     ```tsx
     Clareza para
     <br />
     decidir.
     <br />
     <i>
       Direção para
       <br />
       crescer.
     </i>
     ```
     Sem `{' '}` entre `"para"` e `"decidir."` / `"crescer."`.
- **Ação recomendada para o Codex:**
  - Adicionar `{' '}` antes de todas as tags `<br />` que separam palavras sem pontuação final em `src/App.tsx` e `src/components/JourneyDemo.tsx`.

---

### ITEM 3 (Alta Prioridade) — Peso Excessivo de Imagens da Equipe (`4,24 MB`) e `14,9 MB` de PNGs Não Utilizados no Build (`dist/`)

- **Arquivos afetados:** `scripts/optimize-team-photos.mjs`, `public/team/`, `src/data/teamPhotos.ts`
- **Causa raiz e impacto:**
  1. **14,9 MB de arquivos PNG mortos dentro de `public/team/`:**
     - Os 9 arquivos PNG originais (`ronan-profissional.png` com 2,05 MB, `ronan-severo-estudio-v2.png` com 1,97 MB, `macsuel-silva-estudio-v2.png` com 1,85 MB, `yuri-gabriel-profissional.png` com 1,81 MB, `manoel-neto-profissional.png` com 1,76 MB, `macsuel-silva-profissional.png` com 1,74 MB, `yuri-gabriel-estudio-v2.png` com 1,58 MB, `manoel-neto-estudio-v2.png` com 1,50 MB e `manoel-neto.png` com 303 KB) permanecem em `public/team/`.
     - Como o Vite copia integralmente o diretório `public/` para `dist/`, o build de produção gera **mais de 19 MB** de assets, sendo **14,9 MB de arquivos PNG que nunca são referenciados pelo app**.
  2. **Compressão `lossless: true` sem redimensionamento (`4,24 MB` para 4 fotos):**
     - Em `scripts/optimize-team-photos.mjs` (linhas 23–26), os retratos foram convertidos com `.webp({ lossless: true, exact: true })` mantendo `1122×1402` pixels para exibição em cartões de apenas ~`200px–300px` de largura.
     - Cada retrato WebP pesa cerca de **1 MB** (`921 KB` a `1,18 MB`), totalizando **4,24 MB** de download para 4 fotos, o que causa atraso perceptível na renderização quando o visitante rola até `#quem-somos`.
- **Ação recomendada para o Codex:**
  - Mover os PNGs originais de `public/team/` para fora de `public/` (por exemplo, para `assets-src/team/` ou `docs/team-originals/`) para que não sejam copiados para `dist/` no `npm run build`.
  - Avaliar redimensionamento (`width: 640` ou `720`, 2x retina para o tamanho real do card) ou WebP `quality: 86` / `nearLossless`, reduzindo cada retrato de ~`1.100 KB` para ~`45–80 KB` sem perda visual perceptível.

---

### ITEM 4 (Média Prioridade) — Colisões e Sobrescritas na Cascata CSS (`atmosphere.css`, `brand.css` e `TeamEditorial.css`)

- **Arquivos afetados:** `src/main.tsx`, `src/styles/atmosphere.css`, `src/styles/brand.css`, `src/components/ProjectShowcase.css`, `src/components/TeamEditorial.css`
- **Causa raiz:** Em `src/main.tsx`, `brand.css` e `atmosphere.css` são importados **após** `App.tsx` (e após os CSS de todos os componentes), sobrescrevendo regras temáticas que o próprio `RELATORIO-MELHORIAS-CODEX.md` (Prioridade P2.1) pedia para preservar:
  1. **Anulação das atmosferas de `ProjectShowcase.css`:**
     - `src/components/ProjectShowcase.css` (linhas 97–102) define fundos específicos para `.showroom-saas .showroom-visual` e `.showroom-website .showroom-visual`.
     - Porém, `src/styles/atmosphere.css` (linhas 25–27) declara `.showroom-card .showroom-visual` (mesma especificidade `0,2,0`, mas carregado depois), forçando todas as 3 abas (`Dashboard`, `SaaS` e `Website`) a terem exatamente o mesmo fundo azul escuro.
  2. **Anulação da cor da área de Estratégia e Operações (`WhoWeAre`):**
     - `src/components/TeamEditorial.css` (linhas 28–31) diferencia `.team-editorial-area.team-area-parcerias` com `--team-accent: #a4b9d0` e `--team-border: #3e5166`.
     - Contudo, `src/styles/brand.css` (linhas 296–300) declara `.team-editorial-area, .team-editorial-area.team-area-parcerias { --team-accent: #9acbff; --team-border: #365c87; }`, anulando a diferenciação entre a frente de Negócios (CEO + COO) e a de Engenharia (CTO + SDE).
  3. **Regras duplicadas dentro do próprio `src/styles/brand.css`:**
     - Os seletores `.announcement` (linhas 35 e 290), `.site-header` (linhas 39 e 280), `.process-section, .identity-section` (linhas 112 e 283) e `.site-footer` (linhas 128 e 287) são declarados duas vezes com valores diferentes no mesmo arquivo, e depois sobrescritos uma terceira vez em `src/styles/atmosphere.css` (linhas 9–13).

---

### ITEM 5 (Média Prioridade) — 320 Declarações de Micro-Tipografia (`4px` a `10px`) Remanescentes

- **Arquivos afetados:**
  - `src/components/FlowComparisonMotion.css` (1 ocorrência: linha `179`, `.comparison-idea-status { font-size: 9px; }`)
  - `src/components/JourneyExplorer.css` (3 ocorrências: linhas `51`, `287`, `365` com `9px` e `10px` em elementos reais da interface e do modal)
  - `src/components/OperationalPreviews.css` (69 ocorrências entre `5px` e `9px` nos painéis interativos `NexoEvolution` e `FluxoMonitor`)
  - `src/components/JourneyPreviewDetails.css` (99 ocorrências, chegando a `font-size: 4px` nas linhas `1529`, `1532`, `1599` e `5px` em dezenas de regras)
  - `src/components/JourneyDemo.css` (89 ocorrências entre `5px` e `10px`)
  - `src/components/JourneyAutomation.css` (31 ocorrências entre `6px` e `10px`)
  - `src/components/DevicePreview.css` (29 ocorrências entre `6px` e `10px`)
- **Ação recomendada para o Codex:**
  - Elevar para no mínimo `11px` os textos da interface real (`.comparison-idea-status` em `FlowComparisonMotion.css` e os rótulos/botões de `JourneyExplorer.css`).
  - Nos painéis interativos de demonstração (`OperationalPreviews.css`, `JourneyPreviewDetails.css`, `JourneyDemo.css`, `JourneyAutomation.css`), substituir fontes extremas de `4px–7px` por uma escala legível (`10px–12px`), garantindo que os dados e botões interativos (*"Este mês"*, *"Trimestre"*, *"Todas"*, *"Em revisão"*) sejam confortáveis de ler em qualquer tela.

---

### ITEM 6 (Média Prioridade) — Código Morto, Componentes Órfãos e `.env.local` Ignorado

- **Arquivos afetados:**
  1. **Componentes órfãos (~48 KB de código não utilizado):**
     - `src/components/ClientVision.tsx` e `src/components/ClientVision.css`
     - `src/components/PartnershipPillars.tsx` e `src/components/PartnershipPillars.css`
     - Nenhum desses arquivos é importado no projeto, mas continuam em `src/components/` e listados como ativos no `README.md` (linha 52).
  2. **Seletores CSS órfãos em `src/index.css` e `src/styles/brand.css`:**
     - Regras para `.client-vision`, `.client-vision-cta`, `.client-vision-tabs`, `.pillar-panel`, `.pillars-heading`, `.pillars-tabs`, `.about-section`, `.about-grid`, `.principle`, `.faq-grid`, `.faq-item`, `.faq-support`, `.faq-takeaway` e `.brand-symbol` continuam ocupando espaço no bundle CSS final sem existir no DOM.
  3. **Variável `.env.local` ignorada:**
     - `.env.local` define `VITE_WHATSAPP_NUMBER=556293022434`, mas `src/components/BriefModal.tsx` (linha 28) ignora `import.meta.env.VITE_WHATSAPP_NUMBER` e usa o número hardcoded (`https://wa.me/556293022434`).
     - Usar `(import.meta.env.VITE_WHATSAPP_NUMBER || '556293022434').replace(/\D/g, '')` permite tanto funcionar sem configuração quanto respeitar `.env.local` quando definido.

---

### ITEM 7 (Baixa/Média Prioridade) — Conflito de Foco Inicial nos Modais (`ui.tsx` vs. `SolutionFinder.tsx` e `SolutionsJourney.tsx`)

- **Arquivos afetados:** `src/components/ui.tsx`, `src/components/SolutionFinder.tsx`, `src/components/SolutionsJourney.tsx`
- **Causa raiz:**
  - Em `src/components/ui.tsx` (linhas 50–51), o `useEffect` do `Modal` chama:
    ```tsx
    element?.showModal()
    element?.querySelector<HTMLInputElement>('input')?.focus()
    ```
  - Em `src/components/SolutionFinder.tsx` (linhas 157–159), outro `useEffect` chama `panel.current?.focus()` logo ao montar (`step === 0`), **roubando o foco** do primeiro `<input type="radio">` e colocando-o em uma `<div className="finder-panel" tabIndex={-1}>`.
  - Em `src/components/SolutionsJourney.tsx` (linha 432), como o modal de demonstração não possui `<input>`, o `showModal()` deixa o foco no botão `"Fechar janela"` (`X`) em vez de focar a aba selecionada (`[role="tab"][aria-selected="true"]`).
- **Ação recomendada para o Codex:**
  - Em `ui.tsx`, procurar o primeiro elemento interativo prioritário: `element?.querySelector<HTMLElement>('input, [role="tab"][aria-selected="true"], select, textarea')?.focus()`.
  - Em `SolutionFinder.tsx`, só executar `panel.current?.focus()` quando `step > 0` (nas transições entre os passos 1 e 2), preservando o foco no primeiro `<input type="radio">` ao abrir o modal no passo 0.
