# Newthing — landing page

Uma landing page em português, inspirada na direção visual da Harpia: fundo escuro, azul, tipografia grande, diagramas, serviços, processo e apresentação de projetos. Marca e textos próprios. Os exemplos de produtos são conceituais, com dados fictícios.

Criada com a base sugerida no Guia do Desenvolvedor Júnior: **React + Vite + TypeScript + Tailwind CSS + ESLint**, preparada para **Cloudflare Pages**. Esta entrega roda localmente; não foi publicada.

## Abrir no computador

Requer Node.js 22.12+ ou 24 LTS, conforme os requisitos do Vite atual.

```powershell
cd "C:\Users\User\Desktop\página newthig\base-app"
npm install
npm run dev
```

Abra **http://127.0.0.1:5173/**. Salvar uma alteração nos arquivos atualiza a página automaticamente. Para parar, pressione `Ctrl+C` no terminal.

`npm install` baixa as peças do projeto. `npm run dev` liga a oficina local. Os pacotes e versões exatas ficam registrados em `package-lock.json`; use `npm ci` para reinstalar exatamente essas versões.

## O que está funcionando

- Menu com navegação para as seções e versão para celular.
- Botão Descobrir meu caminho: orientação em duas perguntas, com 12 combinações, acesso ao exemplo e à etapa correspondentes e preenchimento inicial do briefing.
- Jornada interativa de idealização, construção e evolução, com exemplos de sistemas, sites e automações.
- Painel com objetivos, passos práticos e entregas por etapa, conectado ao briefing do projeto.
- Nove demonstrações visuais: planejamento, uso e evolução de um sistema de gestão, site e automação.
- Percurso de luz em sequência: o sonho acende, a Newthing intensifica a luz e o caminho ilumina plano, projeto e realização. Inclui pausa e retomada locais.
- A sequência luminosa foi solicitada explicitamente e funciona nesta seção mesmo com redução de movimento do sistema; as demais animações continuam respeitando essa preferência.
- Abas dos exemplos com navegação por setas, Home e End; automação apresentada em um fluxo claro com ramificações e exemplo de atendimento.
- Seleção interativa de exemplos de projetos.
- Interfaces próprias para Dashboard, SaaS e Website, com navegação por clique ou setas do teclado.
- Seção Quem somos sobre desenvolvimento de software, automação, atendimento e acompanhamento.
- Equipe em duas frentes: estratégia e operações (Yuri e Maksuel), tecnologia e desenvolvimento (Manoel e Ronan), com perfis compactos e fotografias reais.
- Equipe apresentada na ordem: Yuri Gabriel, Maksuel Silva, Manoel Neto e Ronan Severo, organizada por área.
- Perguntas frequentes que abrem e fecham.
- Formulário com validação, plano preliminar por objetivo, revisão, cópia, download e abertura do WhatsApp com o resumo preenchido.
- Janela com foco contido, fechamento por Escape e retorno do foco ao botão.
- Layout responsivo, fonte local e respeito à preferência de movimento reduzido.

**O briefing não envia mensagens automaticamente nem salva informações em servidor.** Os campos ficam na memória da janela enquanto ela está aberta. O plano é baseado nas opções escolhidas e precisa ser validado com a equipe. Copiar e baixar são ações locais; abrir o WhatsApp leva o resumo ao serviço, onde o cliente confirma o envio. Fechar o formulário descarta o preenchimento.

## Onde fazer alterações

| Arquivo                               | Papel                                                         | Primeiro exercício                      |
| ------------------------------------- | ------------------------------------------------------------- | --------------------------------------- |
| `src/App.tsx`                         | Monta a landing page e contém os textos e listas de conteúdo  | Trocar o título principal               |
| `src/components/BriefModal.tsx`       | Formulário, validação e download                              | Adicionar uma pergunta ao briefing      |
| `src/components/SolutionsJourney.tsx` | Jornada de soluções, exemplos práticos e contexto do briefing | Personalizar os objetivos e as entregas |
| `src/components/ProjectShowcase.tsx`  | Abas e três interfaces conceituais distintas                  | Personalizar o exemplo de Website       |
| `src/components/WhoWeAre.tsx`         | Apresentação da empresa e suas especialidades                 | Revisar a descrição dos serviços        |
| `src/components/SolutionFinder.tsx`   | Orientação em duas perguntas e indicação de exemplos          | Revisar os objetivos e os caminhos      |
| `src/components/QuickFaq.tsx`         | Respostas objetivas e aprofundamento opcional                 | Esclarecer dúvidas antes do briefing    |
| `src/components/ui.tsx`               | Peças reutilizáveis, como botão, campo e janela               | Ajustar o visual de um botão            |
| `src/index.css`                       | Cores, tamanhos e adaptação ao celular                        | Trocar a variável `--blue`              |
| `src/main.tsx`                        | Entrada do React e carregamento da fonte                      | Entender como o app começa              |
| `index.html`                          | Título, descrição e metadados da página                       | Atualizar a descrição da empresa        |
| `public/favicon.svg`                  | Ícone da aba do navegador                                     | Personalizar o símbolo da marca         |
| `vite.config.ts`                      | Configuração de Vite, React e Tailwind                        | Entender o endereço local               |
| `wrangler.jsonc`                      | Configuração futura de Cloudflare Pages                       | Escolher o nome do projeto ao publicar  |

React funciona como peças de montar. Vite é a oficina que liga e empacota a página. TypeScript confere os formatos dos dados. Tailwind fornece utilitários visuais, junto do CSS específico da página. ESLint revisa padrões problemáticos.

## Conferir antes de salvar uma etapa

```powershell
npm run lint
npm run typecheck
npm run test:unit
npm run build
npm run preview
```

`lint` revisa o código; `typecheck` confere tipos; `test:unit` verifica as regras dos planos e do resumo usando o executor nativo do Node; `build` prepara a pasta `dist`; `preview` mostra essa versão pronta localmente. Build não publica o site. O endereço do preview aparece no terminal.

Para padronizar a formatação:

```powershell
npm run format
```

Testes de uso: confira o menu em 390px, os links entre seções, todos os exemplos de projeto e perguntas frequentes. Abra o briefing, teste campos inválidos, prepare um exemplo, edite novamente e baixe o arquivo. Confira Escape e navegação por teclado.

A revisão completa de interface, incluindo os tamanhos testados, correções e evidências visuais, está em [docs/REVISAO-COMPLETA-INTERFACE.md](docs/REVISAO-COMPLETA-INTERFACE.md). No celular, confira especialmente o retorno do menu, os erros do briefing, os botões em 320 pixels e a pausa das luzes da jornada.

## Salvar no Git e GitHub

### Briefing e WhatsApp comercial

O botão usa um link direto `wa.me` para o WhatsApp comercial informado, com o resumo do projeto preenchido. Funciona sem configuração adicional, usando `556293022434` como contato padrão. Para trocar o número, defina opcionalmente `VITE_WHATSAPP_NUMBER` em `.env.local` ou no ambiente do build. A configuração aceita DDI/DDD e remove espaços e símbolos; se não restarem dígitos, usa o contato padrão. É necessário reconstruir o site para aplicar a alteração. Isso não exige API ou servidor.

O cliente preenche o briefing, revisa um plano preliminar e escolhe copiar, baixar ou abrir o WhatsApp com o resumo preenchido. O envio é confirmado pelo próprio cliente no WhatsApp. Não há envio automático, análise de IA nem armazenamento em servidor. A equipe valida escopo, tecnologia, prazo e investimento na conversa.

O Git guarda o histórico local. O GitHub guarda uma cópia online. O repositório usa [manoelnetodev/newthing](https://github.com/manoelnetodev/newthing) como remoto. A pasta está preparada com `.gitignore` para excluir dependências, build e arquivos secretos.

Se ainda não houver repositório:

```powershell
git init -b main
git status
git add .
git commit -m "feat: cria landing page Newthing"
```

Confira `git status` e a seleção de arquivos antes do commit. Depois de criar seu repositório no GitHub, use o endereço fornecido por ele para configurar `origin` e fazer push. Não envie senhas, tokens ou informações de clientes.

## Publicar depois no Cloudflare Pages

1. Crie seu repositório no GitHub e envie a versão conferida.
2. No Cloudflare Pages, conecte esse repositório.
3. Escolha sua branch principal, comando **`npm run build`** e saída **`dist`**.
4. Configure uma versão de Node compatível com os requisitos do Vite instalado.
5. Revise o preview antes de usar um domínio de produção.

Para conferir a build usando o ambiente local do Wrangler:

```powershell
npm run cf:preview
```

Abra o endereço mostrado, normalmente **http://127.0.0.1:8788/**. Esse comando usa apenas recursos locais.

Documentação: [React no Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/), [desenvolvimento local](https://developers.cloudflare.com/pages/functions/local-development/), [Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite), [Vite](https://vite.dev/guide/).

## Fotos da equipe e Cloudflare R2

Os nove PNGs originais ficam em `assets-src/team/`; os quatro WebPs anteriores, em `assets-src/team/masters/`. Esses arquivos continuam preservados e não entram no diretório publicado. O site usa variantes WebP de 360 e 720 pixels com `srcSet`, carregamento sob demanda e cópias locais de reserva em `public/team/responsive/`.

```powershell
npm run photos:optimize
npm run photos:upload -- newthing-media https://pub-3a898b56bec94bd5baa3627d4f5c9ac5.r2.dev
```

A otimização redimensiona explicitamente cada original para a largura da variante e comprime em WebP **sem perdas adicionais**. O script compara os pixels decodificados à referência redimensionada, incluindo transparência; os originais mantêm a resolução completa. Os resultados ficam em `docs/TEAM-PHOTO-OPTIMIZATION.json`.

O upload requer uma sessão Wrangler já autorizada na conta do bucket. Ele publica as oito variantes, verifica os bytes baixados do R2 e só então troca o manifesto `src/data/teamPhotos.ts` para as URLs públicas. A publicação fica registrada em `docs/TEAM-PHOTO-PUBLICATION.json`. Executar somente a otimização volta o manifesto para as cópias locais; executar o upload restaura os endereços do R2 após a verificação. Nenhuma credencial deve ser versionada.

## Evoluir com as outras dicas do guia

Veja [docs/PROXIMOS-PASSOS.md](docs/PROXIMOS-PASSOS.md). A marca e o contato comercial já estão configurados. Qualquer API futura deve ser avaliada conforme uma necessidade real do projeto. A análise e as correções da auditoria estão em [docs/RESPOSTA-ANALISE-CODEX.md](docs/RESPOSTA-ANALISE-CODEX.md).
