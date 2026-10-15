# Relatório de Auditoria Visual, Estrutural e de Conversão (CRO) — Newthing
> **Documento de Especificação Técnica e Direção de Produto para Execução pelo Codex**
> **Alvo:** Aplicação React + TypeScript + Vite (`base-app`)

---

## 1. Diagnóstico Executivo: Por que o site atual perde impacto e interesse?

Após análise completa de todos os componentes (`src/App.tsx`, `src/components/*.tsx`) e folhas de estilo (`src/index.css`, `src/styles/brand.css`, `src/styles/hero.css` e CSS modulares), identificamos **5 gargalos críticos** que impedem o site de parecer memorável, indispensável e comercialmente persuasivo:

1. **Micro-tipografia Ilegível ("Síndrome de Fonte Microscópica"):**
   - A página utiliza tamanhos de fonte entre `5px` e `11px` em dezenas de elementos críticos (botões principais com `11px`, parágrafo principal da Hero com `13px`, eyebrows com `6px–8px`, legendas de fotos com `5px–6px`, textos de apoio com `9px–11px`).
   - **Efeito no cliente:** Causa fadiga visual imediata, dificulta a leitura em monitores desktop e celulares, e reduz a percepção de autoridade.

2. **Fadiga de Abas ("Tab Fatigue") e Redundância Estrutural Severa:**
   - O usuário encontra **5 sistemas de abas complexos** ao rolar a página (`SolutionsJourney`, `ProjectShowcase`, `ClientVision`, `PartnershipPillars`, `QuickFaq`) além do modal `SolutionFinder`.
   - As seções `#solucoes` (3 cards de fases), `#processo` (4 passos do processo), `#quem-somos` (`ClientVision` + `PartnershipPillars`) e `#sobre` (3 princípios) **repetem exatamente a mesma mensagem abstrata** ("ouvimos você", "definimos o escopo", "organizamos pedidos e atendimento") 4 a 5 vezes seguidas.
   - **Efeito no cliente:** O visitante sente que está lendo o mesmo texto em loop, perde o interesse no meio da rolagem e abandona a página antes de chegar à equipe ou ao CTA final.

3. **Colisão de Estilos (`index.css` vs. `brand.css` vs. `hero.css`) e Monotonia Cromática:**
   - O arquivo `src/styles/brand.css` sobrescreve regras de `index.css`, `ProjectShowcase.css` e `WhoWeAre.css` de forma destrutiva.
   - Exemplo crítico: `ProjectShowcase.css` define identidades visuais ricas para os 3 projetos (azul para Dashboard, violeta `#b7a1f7` para SaaS Orbit, verde editorial `#c4d8a4` para Website Forma), mas `brand.css` (linhas 211–220) força todos os cards de volta para o mesmo azul escuro genérico. O mesmo ocorre com a diferenciação da equipe de Estratégia/Negócios em `WhoWeAre.css`.
   - Em `FlowComparisonMotion.css` e `JourneyPathMotion.css`, o uso excessivo de `!important` nas animações impede que a regra global `@media (prefers-reduced-motion: reduce)` funcione adequadamente.

4. **Copywriting Excessivamente Abstrato vs. Dor Real do Cliente:**
   - Há excesso de frases filosóficas ("O que você imagina merece acontecer", "Uma direção compartilhada", "A conquista se revela no dia a dia") e falta de **ancoragem em dores reais e tangíveis** de empresários (ex.: *planilhas descentralizadas, atendimento lento no WhatsApp, falta de visibilidade de margem e caixa, sistemas engessados que não conversam*).

5. **Conversão Passiva ("Projeto de Demonstração") e Falta de Utilidade Prática Imediata:**
   - O rodapé exibe `"Projeto de demonstração"` e o `BriefModal` apenas baixa um arquivo `.txt` local dizendo `"Nenhum dado foi enviado"`.
   - Para tornar o site **indispensável**, o diagnóstico/briefing deve gerar um **Blueprint Estratégico do Projeto** (com arquitetura recomendada, módulos da V1, cronograma estimado de etapas e opção de envio direto via WhatsApp/API para os sócios), além de oferecer uma ferramenta interativa de valor imediato (como um **Simulador de Impacto Operacional / Economia de Tempo**).

---

## 2. Plano de Melhorias Priorizado para o Codex

As instruções abaixo estão organizadas por prioridade (**P0 a P3**) para que o Codex possa implementá-las de forma cirúrgica, mantendo a tipagem TypeScript (`npm run typecheck`), o lint (`npm run lint`) e o build (`npm run build`) 100% íntegros.

---

### PRIORIDADE P0 — Correção da Escala Tipográfica e Legibilidade Global

**Objetivo:** Elevar imediatamente a presença visual, o conforto de leitura e o padrão de design (nível Linear / Stripe / Vercel), eliminando todas as fontes abaixo de `11px`.

#### Arquivos a modificar:
- `src/index.css`
- `src/styles/hero.css`
- `src/styles/brand.css`
- `src/components/SolutionsJourney.css`
- `src/components/ProjectShowcase.css`
- `src/components/WhoWeAre.css`
- `src/components/PartnershipPillars.css`
- `src/components/ClientVision.css`
- `src/components/QuickFaq.css`
- `src/components/SolutionFinder.css`

#### Tabela de Substituição Obrigatória de Fontes:
| Elemento / Seletor | Valor Atual (Problemático) | Novo Valor Recomendado |
| :--- | :--- | :--- |
| **Eyebrows / Badges / Labels em caixa alta** (`.eyebrow`, `.hero-eyebrow`, `.journey-label`, `.showroom-category`, `.team-area-label`) | `6px` a `9px` | **`11px` a `12px`** (`0.6875rem` – `0.75rem`), `letter-spacing: 0.12em` |
| **Parágrafo principal da Hero** (`.hero-opening .hero-content > p`) | `13px` (`12px` mobile) | **`clamp(16px, 1.35vw, 19px)`**, `line-height: 1.65`, `max-width: 640px` |
| **Botões principais e secundários** (`.button`, `.hero-buttons .button`, `.header-cta`) | `9px` a `12px` | **`14px`** (`13px` no header/mobile), `font-weight: 600` |
| **Navegação do Header** (`.main-nav > a`) | `12px` (`11px` tablet) | **`14px`** (`13px` tablet) |
| **Subtítulos de Seção** (`.section-heading p`) | `13px` (`12px` mobile) | **`16px`** (`15px` mobile), `line-height: 1.7` |
| **Corpo de texto de Cards, Passos e FAQ** (`.journey-card > p`, `.process-step p`, `.team-description`, `.quick-faq-answer-copy > p`) | `10px` a `12px` | **`14px` a `15px`**, `line-height: 1.65` |
| **Itens de lista e entregáveis** (`.journey-card li`, `.step-deliverable`, `.showroom-copy li`) | `8px` a `11px` | **`13px` a `14px`** |
| **Legendas e micro-textos** (`.diagram-caption`, `.team-photo-caption`, `.footer-bottom`, `.showroom-caption`) | `5px` a `8px` | **Mínimo absoluto de `11px` a `12px`** |

---

### PRIORIDADE P1 — Rearquitetura Estrutural e Eliminação de Redundância

**Objetivo:** Tornar a jornada de leitura dinâmica, enxuta e magnética, eliminando a repetição de seções que dizem a mesma coisa.

#### Mudanças Estruturais em `src/App.tsx`:

1. **Fundir `#processo` ("Um caminho claro. Sem pular etapas") e `#sobre` ("Por que Newthing"):**
   - **Problema atual:** `#solucoes` já apresenta os 3 grandes momentos (`Idealização`, `Construção`, `Realização`). Logo abaixo, `#processo` repete 4 passos quase idênticos (`Entender`, `Desenhar`, `Construir`, `Evoluir`). E depois de `WhoWeAre`, a seção `#sobre` repete 3 princípios que já estão em `WhoWeAre`.
   - **Solução para o Codex:**
     - Remover a seção `#sobre` isolada (que é redundante com `WhoWeAre` e `PartnershipPillars`).
     - Transformar `#processo` em uma seção de **Compromissos de Execução & Governança (Como trabalhamos na prática)** mais direta e escaneável, ou integrar os 3 princípios de `#sobre` dentro de `#processo` como uma barra de garantias reais (ex.: *Escopo fechado antes de codar*, *Entregas semanais visíveis*, *Código e arquitetura sob seu controle*).

2. **Enxugar `WhoWeAre.tsx` para destacar as Pessoas e a Dupla Competência (Negócios + Engenharia):**
   - **Problema atual:** `WhoWeAre.tsx` contém 3 sub-blocos gigantes: `identity-intro` (com o widget `ClientVision` de 3 abas), `identity-team` (4 perfis enormes divididos em 2 blocos repetitivos) e `PartnershipPillars` (mais 4 abas com mockups). Isso faz a seção `#quem-somos` ter quase 3.000px de altura!
   - **Solução para o Codex:**
     - **Dar protagonismo imediato ao Time e à Tese da Newthing:** O grande diferencial da Newthing é unir **Visão Financeira, Contábil e Operacional (Yuri Gabriel - CEO & Maksuel Silva - COO)** com **Arquitetura de Software e Automação (Manoel Neto - CTO & Ronan Severo - SDE)**. Isso deve ser o coração de `#quem-somos`.
     - **Compactar o grid da equipe (`.team-area`):** Exibir os 4 integrantes em um layout editorial de 4 colunas (ou 2x2 integrado com cards mais elegantes e proporcionais), reduzindo a altura excessiva dos retratos e adicionando badges claros de especialidade.
     - **Simplificar `PartnershipPillars` ou `ClientVision`:** Não manter dois sistemas de abas dentro de `WhoWeAre`. Transformar `ClientVision` em uma demonstração visual direta (ou fundir com os pilares) para que o usuário não precise clicar em 7 abas diferentes apenas dentro da seção "Quem Somos".

3. **Inverter a Ordem de Prova Visual (`ProjectShowcase` mais próximo do topo):**
   - **Problema atual:** O visitante precisa passar por toda a matriz de texto de `SolutionsJourney` e `process-section` antes de ver o `ProjectShowcase` (`#projetos`), onde estão os 3 melhores conceitos visuais (`Workspace Dashboard`, `Orbit SaaS`, `Forma Website`).
   - **Solução para o Codex:**
     - Posicionar a vitrine visual de projetos (`ProjectShowcase`) ou os previews interativos logo após a proposta de valor, ou tornar a transição entre `SolutionsJourney` e `ProjectShowcase` complementar (onde `ProjectShowcase` foca no **Produto Final de Alta Fidelidade** e `SolutionsJourney` foca no **Como chegamos lá em 3 etapas**).

---

### PRIORIDADE P2 — Elevação Visual, Contraste Cromático e Micro-interações

**Objetivo:** Fazer o cliente sentir que está diante de um estúdio de tecnologia de elite.

1. **Restaurar a Identidade Cromática de cada Projeto em `src/styles/brand.css`:**
   - Em `src/styles/brand.css` (linhas 211–220), **remover ou refinar** a regra que sobrescreve `.showroom-card.showroom-saas` e `.showroom-card.showroom-website`.
   - Permitir que a aba **Dashboard (Workspace)** brilhe em Azul Royal (`#8daeff`), a aba **SaaS (Orbit)** tenha sua atmosfera Violeta/Indigo (`#b7a1f7`) e a aba **Website (Forma)** tenha seu toque Editorial Verde/Marfim (`#c4d8a4`). Essa mudança de atmosfera ao clicar nas abas de `#projetos` cria um efeito visual impressionante ("wow factor").
   - Da mesma forma, em `WhoWeAre.css` vs `brand.css`, permitir que a frente de **Estratégia & Operações (CEO + COO)** mantenha seu sutil acento verde-esmeralda/menta (`--nt-positive: #8ec5b1`) enquanto **Tecnologia & Desenvolvimento (CTO + SDE)** usa o azul elétrico (`--nt-accent-soft: #9abaff`), reforçando visualmente a união das duas áreas.

2. **Melhorar o Diagrama da Hero (`FlowComparison` em `src/App.tsx`):**
   - Hoje os dois cards ("Quando as peças não se conectam" vs. "Com a Newthing") têm os mesmos 4 nós estáticos (`Estratégia`, `Design`, `Código`, `Integrações`).
   - **Melhoria Visual e de Copy:**
     - No card esquerdo (*"O cenário comum nas empresas"*), mostrar as dores reais que o empresário sente: **`Planilhas soltas`**, **`Retrabalho manual`**, **`Sistemas que não conversam`**, **`Decisões no escuro`**.
     - No card direito (*"Com a Newthing"*), mostrar a transformação conectada ao redor do hub `n.`: **`Estratégia & Finanças`**, **`Experiência & Design`**, **`Sistema Sob Medida`**, **`Automação & IA`**.
     - Adicionar um indicador visual claro de impacto no rodapé do card direito (ex.: *"-70% de tarefas manuais · 100% visibilidade da operação"*).

3. **Corrigir Acessibilidade de Movimento (`prefers-reduced-motion`):**
   - Remover os `!important` desnecessários de `FlowComparisonMotion.css` e `JourneyPathMotion.css` que bloqueiam o `@media (prefers-reduced-motion: reduce)`, usando seletores de atributo limpos (`[data-energy-motion='running']`) que respeitem a preferência do sistema ou o botão local de pausa.

---

### PRIORIDADE P3 — Funcionalidades de "Indispensabilidade" (Para Converter de Verdade)

**Objetivo:** Transformar o site de um "folheto institucional passivo" em uma **ferramenta de diagnóstico e fechamento de negócios** que o cliente não consegue ignorar.

#### Opção A (Altamente Recomendada): Transformar o `BriefModal` + `SolutionFinder` em um "Gerador de Blueprint de Projeto" com Envio para WhatsApp
- **Por que hoje é fraco:** O cliente preenche nome, e-mail e ideia, e o modal diz *"Nenhum dado foi enviado. Baixe um .txt"*. Além disso, o rodapé diz *"Projeto de demonstração"*.
- **O que o Codex deve implementar em `src/components/BriefModal.tsx` e `src/App.tsx`:**
  1. Remover o aviso *"Projeto de demonstração"* do rodapé em `App.tsx`, substituindo por posicionamento real: `© 2026 Newthing. Tecnologia, estratégia e sistemas sob medida.`
  2. Quando o usuário conclui o preenchimento no `BriefModal`, em vez de apenas mostrar o texto digitado, gerar automaticamente um **Diagnóstico Preliminar Estruturado (Blueprint)** baseado no estágio/objetivo escolhido:
     - **Arquitetura Sugerida:** (ex.: *Web App Responsivo + Painel de Gestão + Integração via API*)
     - **Escopo Recomendado para a 1ª Versão (MVP):** 3 entregas práticas personalizadas para a opção selecionada.
     - **Equipe Envolvida na Newthing:** Mostrar que o diagnóstico passará por **Yuri & Maksuel (Viabilidade e Negócio)** e **Manoel & Ronan (Arquitetura e Construção)**.
  3. Oferecer **3 ações de conversão reais** no estado de sucesso do modal:
     - **Botão Principal:** `"Iniciar conversa no WhatsApp com meu briefing"` (gera link `https://wa.me/...?text=...` com o briefing já formatado e pronto para enviar, ou permite configurar o número via constante/variável de ambiente).
     - **Botão Secundário:** `"Copiar resumo para a área de transferência"` (com feedback visual `"Copiado!"`).
     - **Botão Terciário:** `"Baixar documento de briefing (.txt)"`.

#### Opção B: Adicionar uma Seção/Widget Interativo de "Diagnóstico Rápido: Sinais de que sua empresa precisa da Newthing" (ou Simulador de Ganho Operacional)
- **Onde entrar:** Entre `#solucoes` e `#projetos` (ou substituindo a redundante seção `#sobre`).
- **Como funciona:**
  - Um componente interativo enxuto e de alto impacto visual chamado **`ImpactSimulator.tsx`** (ou **`BusinessDiagnostic.tsx`**):
  - Permite ao visitante clicar no gargalo atual da empresa:
    1. *"Minha equipe perde horas em planilhas e controles manuais"*
    2. *"Meus clientes demoram para receber retorno ou orçamento"*
    3. *"Minha marca parece menor na internet do que ela realmente é"*
    4. *"Tenho uma ideia de produto digital / SaaS e não sei por onde começar"*
  - Ao selecionar, mostra lado a lado:
    - **O custo invisível hoje** (o que a empresa perde toda semana).
    - **A intervenção Newthing** (o que construímos nas primeiras semanas).
    - **O resultado concreto na operação** + CTA direto que já abre o `BriefModal` preenchido com esse cenário.

---

## 3. Guia Passo a Passo de Prompts para Enviar ao Codex

Você pode enviar este relatório inteiro para o Codex ou aplicar as melhorias em **3 etapas seguras** copiando os prompts abaixo:

### Prompt 1 para o Codex (Tipografia, Contraste e Correção do CSS):
> "Leia o arquivo `docs/RELATORIO-MELHORIAS-CODEX.md`. Execute a **Prioridade P0** e a **Prioridade P2**:
> 1. Corrija toda a escala tipográfica nos arquivos CSS (`index.css`, `hero.css`, `SolutionsJourney.css`, `ProjectShowcase.css`, `WhoWeAre.css`, `PartnershipPillars.css`, `ClientVision.css`, `QuickFaq.css`), garantindo que nenhum texto fique abaixo de `11px`, que os botões tenham `13px–14px`, parágrafos de leitura `14px–16px` e o subtítulo da Hero `clamp(16px, 1.35vw, 19px)`.
> 2. Em `src/styles/brand.css`, remova a sobrescrita que anula as cores temáticas de `.showroom-saas` e `.showroom-website` do `ProjectShowcase.css`, permitindo que cada projeto da vitrine tenha sua própria atmosfera visual, e preserve também o destaque visual da área de Parcerias em `WhoWeAre.css`.
> 3. Atualize o componente `FlowComparison` em `src/App.tsx` para contrastar dores reais de negócio ('Planilhas soltas', 'Retrabalho manual', 'Sistemas desconectados', 'Decisões no escuro') com a solução integrada da Newthing.
> 4. Rode `npm run lint`, `npm run typecheck` e `npm run build` para validar."

### Prompt 2 para o Codex (Arquitetura da Página e Eliminação de Redundâncias):
> "Agora execute a **Prioridade P1** de `docs/RELATORIO-MELHORIAS-CODEX.md`:
> 1. Elimine a redundância entre `#processo` e `#sobre` em `src/App.tsx`, unificando os princípios inegociáveis da Newthing com as etapas de entrega em uma única seção forte, escaneável e sem repetição de texto.
> 2. Na seção `WhoWeAre.tsx`, destaque de forma mais direta e escaneável a união entre Liderança de Negócios/Finanças (Yuri Gabriel - CEO e Maksuel Silva - COO) e Engenharia de Software (Manoel Neto - CTO e Ronan Severo - SDE), reduzindo a altura excessiva da seção para evitar fadiga de rolagem.
> 3. Remova o texto 'Projeto de demonstração' do rodapé em `src/App.tsx`, posicionando a marca Newthing de forma oficial e comercial.
> 4. Rode `npm run lint`, `npm run typecheck` e `npm run build` para validar."

### Prompt 3 para o Codex (Tornar o Site Indispensável — Blueprint Interativo e Conversão):
> "Agora execute a **Prioridade P3** de `docs/RELATORIO-MELHORIAS-CODEX.md`:
> 1. Evolua o `BriefModal.tsx` para que, ao concluir o preenchimento, ele gere um **Blueprint Preliminar do Projeto** (mostrando Arquitetura Sugerida, Prioridades recomendadas para a 1ª versão e como a dupla Negócios + Engenharia da Newthing atuará nesse cenário).
> 2. Adicione no estado de conclusão do `BriefModal.tsx` botões práticos de ação: 'Enviar meu briefing pelo WhatsApp' (com mensagem estruturada via `encodeURIComponent`), 'Copiar briefing' (com feedback visual de copiado) e 'Baixar arquivo (.txt)'.
> 3. Confira responsividade mobile, acessibilidade (teclado/ARIA) e rode `npm run lint`, `npm run typecheck` e `npm run build`."
