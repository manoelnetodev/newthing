# Relatório de Produto, Engenharia e Conversão — O que falta para a Excelência na Newthing

**Data:** 16 de Outubro de 2026  
**Escopo:** Análise pós-auditoria (após commit `745fcd2`) com visão de dono de produto (Product, CRO, UI/UX, Performance e Produção)  
**Projeto:** Newthing (`base-app`)

---

## 1. Diagnóstico Atual: Onde já estamos (Pós-Commit `745fcd2`)

As alterações recém-aplicadas elevaram a saúde técnica do projeto de forma expressiva:
- **Build enxuto:** Os originais em PNG saíram de `public/team/` para `assets-src/team/`, reduzindo o pacote de produção (`dist/`) de **20,43 MB para 3,34 MB** (-83,6%).
- **Imagens responsivas com `srcSet`:** `WhoWeAre.tsx` agora entrega variantes `360w` e `720w` com fallback automático caso o R2 falhe.
- **Higiene de código e CSS:** Remoção de 254 linhas de CSS órfão e componentes mortos (`ClientVision`, `PartnershipPillars`), além da unificação do mapa de navegação em `App.tsx` e elevação da micro-tipografia para o piso de `11px`.
- **Zero quebras estruturais:** Validado em 7 viewports (`320px` a `1920px`), sem overflow horizontal e com todos os fluxos interativos funcionais.

**Veredito atual:** O site hoje é **tecnicamente sólido, bonito e funcional (nota 8.7/10)**. Porém, olhando **como dono do negócio** — onde o objetivo do site é **transmitir autoridade imediata, carregar instantaneamente no 4G e converter visitantes indecisos em reuniões qualificadas** — ainda existem **10 pontos estratégicos** que separam o projeto atual do **nível 10/10 (Excelência / Tier-1 Studio)**.

---

## 2. Pilar 1 — Conversão Comercial e Retenção de Leads (CRO)

### 2.1. O "Ponto Cego" do Funil: Zero Captura antes do Clique no WhatsApp
- **Onde está:** `src/components/BriefModal.tsx` (linhas 38–46 e 121–134).
- **O problema de dono:** Quando o visitante preenche nome, e-mail, estágio e descreve o projeto, o `BriefModal` gera um plano excelente (`ready = true`), mas **tudo acontece apenas na memória do navegador**. Se o usuário gerar o plano, achar interessante, mas estiver no computador sem WhatsApp Web logado (ou fechar a aba para responder depois), **você perde 100% do lead** — mesmo ele já tendo digitado o nome e o e-mail!
- **Como atingir a excelência:**
  - Criar uma **Cloudflare Pages Function** leve (`functions/api/briefing.ts`) conectada a um Webhook (Discord/Slack da Newthing, Resend ou banco D1/KV).
  - Assim que o usuário clicar em **"Gerar meu plano inicial"**, salvar/notificar silenciosamente o lead em background (com aviso transparente de privacidade) ou oferecer o botão **"Receber este plano no meu e-mail"**. Isso garante que nenhum lead qualificado se perca no meio do caminho.

### 2.2. Perda Acidental de Dados ao Fechar o Modal (`BriefModal`)
- **Onde está:** `src/components/BriefModal.tsx` (linhas 16–21) + `src/components/ui.tsx` (linhas 91–105).
- **O problema de dono:** O componente `<Modal>` fecha imediatamente ao clicar fora da caixa (`backdrop`) ou apertar `Esc`. Como o estado `values` vive apenas dentro de `BriefModal` (que é desmontado quando `briefOpen` vira `false` em `App.tsx`), se o cliente estiver escrevendo um texto detalhado sobre sua ideia e clicar sem querer fora do modal, **ele perde tudo o que digitou**. Ninguém digita um briefing duas vezes.
- **Como atingir a excelência:**
  - Persistir o rascunho de `values` (`name`, `email`, `stage`, `project`) em `sessionStorage` (ex.: `newthing:brief-draft`), limpando apenas quando o usuário clicar em "Limpar" ou concluir.
  - Opcionalmente, não fechar no clique acidental do backdrop quando `values.project.trim().length > 0`.

### 2.3. Falta de Prova Tangível de Resultados (Cases Reais vs. Simulações)
- **Onde está:** `src/components/DevicePreview.tsx` e `src/components/JourneyDemo.tsx`.
- **O problema de dono:** Os simuladores interativos (Clínica Horizonte, Studio Vértice, Painel Atlas) são um diferencial técnico incrível porque mostram *capacidade de engenharia de interface*. Porém, um decisor B2B sempre se pergunta: *"Eles já colocaram sistemas reais no ar? Para quem?"*.
- **Como atingir a excelência:**
  - Mesmo que a Newthing esteja em fase de consolidação de portfólio, incluir nos cards de `WhoWeAre.tsx` ou em uma faixa complementar de `DevicePreview` **entregas reais verificáveis** (mesmo que sejam projetos assinados pelos sócios, já que 3 deles já têm sites reais linkados: `manoelneto.eti.br`, `yurigabriel.com.br`, `maksuelsilva.com`) com contexto de negócio real (*"O que foi resolvido + stack + link real"*).

---

## 3. Pilar 2 — Performance de Carregamento e Infraestrutura de Mídia

### 3.1. Retratos em WebP `lossless` ainda pesam ~1,85 MB somados (10x mais que o ideal)
- **Onde está:** `scripts/optimize-team-photos.mjs` (linha 40: `.webp({ lossless: true, exact: true, effort: 6 })`) e `docs/TEAM-PHOTO-OPTIMIZATION.json`.
- **O problema de dono:** Usar WebP `lossless: true` para **fotografias de estúdio com fundo transparente** faz com que cada imagem `720w` ainda pese entre **399 KB e 507 KB** (total de **1,85 MB** para 4 fotos em telas Retina), e as de `360w` pesem **98 KB a 122 KB**. Em fotografia, `lossless` guarda ruído de sensor invisível a olho nu.
- **Como atingir a excelência:**
  - Trocar no `scripts/optimize-team-photos.mjs` para `.webp({ quality: 84, alphaQuality: 90, effort: 6 })` (e opcionalmente gerar `.avif`).
  - **Impacto real:** Cada foto `720w` cai de **~460 KB para ~42 KB** (redução de **90%** no peso sem nenhuma diferença visual perceptível), fazendo a seção "Quem somos" abrir instantaneamente em qualquer 4G.

### 3.2. Dependência desnecessária do domínio de desenvolvimento `*.r2.dev`
- **Onde está:** `src/data/teamPhotos.ts` (`https://pub-3a898b56bec94bd5baa3627d4f5c9ac5.r2.dev/team/...`).
- **O problema de dono:**
  1. A própria Cloudflare documenta que subdomínios públicos `*.r2.dev` são destinados apenas a desenvolvimento e **possuem rate-limiting (estrangulamento de requisições)** em produção.
  2. Como as imagens otimizadas já estão dentro de `public/team/responsive/` (e portanto já vão para a CDN global do Cloudflare Pages no deploy), buscar primeiro no `r2.dev` abre uma nova conexão DNS/TLS externa à toa e ainda corre risco de rate-limit!
- **Como atingir a excelência:**
  - Servir `/team/responsive/...` como fonte primária (`src` e `srcSet`) diretamente pela CDN do Cloudflare Pages (mesmo domínio, HTTP/3 multiplexado, zero latência extra de DNS/TLS e sem limite de banda), ou configurar um domínio customizado (`cdn.newthing.com.br`) caso queira manter no R2.

---

## 4. Pilar 3 — Presença ao Compartilhar (WhatsApp / LinkedIn) e SEO Técnico

### 4.1. Link compartilhado no WhatsApp/LinkedIn aparece "cego" (Sem `og:image`)
- **Onde está:** `index.html` (linhas 14–20).
- **O problema de dono:** Como uma consultoria de tecnologia envia propostas e links pelo WhatsApp e LinkedIn todos os dias, a primeira impressão do cliente acontece **dentro da conversa do WhatsApp** quando ele recebe o link do site. Hoje, `index.html` tem `og:title` e `og:description`, mas **não tem `og:image`, `og:url`, `og:locale` nem `twitter:card`**. O link aparece sem miniatura visual ou puxa um ícone quebrado.
- **Como atingir a excelência:**
  - Criar um card social `1200x630` com a estética escura da Newthing (`public/brand/og-newthing-1200x630.png`) e adicionar em `index.html`:
    - `<meta property="og:image" content="https://newthing.com.br/brand/og-newthing-1200x630.png" />`
    - `<meta property="og:image:width" content="1200" />` e `<meta property="og:image:height" content="630" />`
    - `<meta property="og:locale" content="pt_BR" />`
    - `<meta name="twitter:card" content="summary_large_image" />`
    - `<link rel="canonical" href="https://newthing.com.br/" />`

### 4.2. Ausência de Dados Estruturados (Schema.org JSON-LD), `robots.txt` e `sitemap.xml`
- **Onde está:** `index.html` e pasta `public/`.
- **O problema de dono:** O site possui uma seção inteira de Dúvidas Frequentes (`QuickFaq.tsx`) e informações claras sobre a empresa e seus 4 fundadores, mas o Google e buscadores de IA (Perplexity, ChatGPT Search, Google AI Overviews) não recebem um bloco `application/ld+json` estruturado (`Organization` / `ProfessionalService` + `FAQPage`), nem encontram `robots.txt` e `sitemap.xml` em `public/`.
- **Como atingir a excelência:**
  - Injetar JSON-LD em `index.html` declarando a `ProfessionalService` Newthing, seus fundadores e as perguntas de FAQ, além de adicionar `public/robots.txt` e `public/sitemap.xml`.

---

## 5. Pilar 4 — Refinamento de UI/UX e Micro-detalhes de Produto

### 5.1. Falta de Indicador de Seção Ativa (Scrollspy) no Header Fixo
- **Onde está:** `src/App.tsx` (linhas 92–98) e `src/styles/brand.css` (linhas 43–48).
- **O problema de dono:** O cabeçalho acompanha a rolagem da página inteira (`position: sticky`), mas os 6 links (`Início`, `Projetos`, `Soluções`, `Como fazemos`, `Quem somos`, `Dúvidas`) ficam todos com a mesma cor estática (`--nt-text-secondary`). O usuário não tem feedback visual de onde está na narrativa da página.
- **Como atingir a excelência:**
  - Adicionar um `IntersectionObserver` enxuto em `App.tsx` que observa as seções (`#inicio`, `#projetos`, `#solucoes`, `#processo`, `#quem-somos`, `#duvidas`) e aplica `aria-current="location"` no link ativo, destacando-o sutilmente no header.

### 5.2. Assimetria no Card de Ronan Severo em "Quem somos"
- **Onde está:** `src/components/WhoWeAre.tsx` (linhas 19–62 e 225–245).
- **O problema de dono:** Nos 4 cards da equipe, Manoel, Yuri e Maksuel possuem um botão de ação no rodapé do card (`Conhecer trajetória ↗`), enquanto o card de **Ronan Severo** termina sem link nenhum, deixando a base dos dois cards de Engenharia visualmente assimétrica no desktop.
- **Como atingir a excelência:**
  - Adicionar o link profissional de Ronan (LinkedIn, GitHub ou página profissional) ou um selo equivalente de perfil técnico na base do card para manter 100% de simetria visual e credibilidade entre os 4 sócios.

### 5.3. Mensagem do WhatsApp sem Contexto quando o Usuário Clica nos CTAs Rápidos
- **Onde está:** `src/components/JourneyDemo.tsx` e `src/components/DevicePreview.tsx` vs `src/App.tsx`.
- **O problema de dono:** Quando o visitante está explorando uma aba específica do `DevicePreview` (ex.: *"Sistema web — Painel Atlas"*) e clica em **"Quero um projeto assim"** (`onOpenBrief('Quero construir um sistema')`), o `BriefModal` abre com o `<select>` preenchido, mas se o usuário vier pelo `SolutionFinder`, ambos `stage` e `project` vêm preenchidos. Padronizar para que o clique em **"Quero um projeto assim"** no `DevicePreview` ou no `JourneyDemo` já pré-selecione o estágio correspondente E sugira um placeholder contextualizado (ou pré-preencha o tópico) aumenta a taxa de conclusão do formulário.

---

## 6. Matriz de Priorização (Plano de Ação Recomendado)

| Prioridade | Entrega | Impacto | Esforço |
| :--- | :--- | :--- | :--- |
| **P0 (Imediato)** | **Card OpenGraph (`og:image` 1200x630) + Meta tags sociais + JSON-LD** em `index.html` | Muito Alto (WhatsApp/LinkedIn/SEO) | ~20 min |
| **P0 (Imediato)** | **Persistência em `sessionStorage` no `BriefModal`** para nunca perder dados digitados | Alto (Proteção de Conversão) | ~15 min |
| **P0 (Imediato)** | **Servir retratos da CDN própria + WebP `quality: 84`** (caindo de 1,85 MB para ~180 KB total) | Muito Alto (Velocidade no 4G) | ~15 min |
| **P1 (Curto Prazo)** | **Scrollspy (`aria-current`) no Header** + Simetria de link no card do Ronan | Médio/Alto (Acabamento Premium) | ~25 min |
| **P1 (Curto Prazo)** | **Endpoint `/api/briefing` (Cloudflare Pages Function)** para salvar leads gerados antes do WhatsApp | Muito Alto (Inteligência Comercial) | ~40 min |
