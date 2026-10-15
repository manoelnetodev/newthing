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
- Painel de intenções em Quem somos: três objetivos mostram abordagens diferentes de escuta e planejamento, levando a escolha para o briefing.
- Equipe apresentada na ordem: Yuri Gabriel, Maksuel Silva, Manoel Neto e Ronan Severo, organizada por área.
- Perguntas frequentes que abrem e fecham.
- Formulário com validação, revisão e download de briefing em texto.
- Janela com foco contido, fechamento por Escape e retorno do foco ao botão.
- Layout responsivo, fonte local e respeito à preferência de movimento reduzido.

**O briefing não envia mensagens nem salva informações em servidor.** Os campos ficam na memória da janela enquanto ela está aberta e o download é gerado no navegador. Fechar a janela descarta o preenchimento. Não há autenticação, banco de dados ou integração de contato nesta versão.

## Onde fazer alterações

| Arquivo                               | Papel                                                              | Primeiro exercício                          |
| ------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `src/App.tsx`                         | Monta a landing page e contém os textos e listas de conteúdo       | Trocar o título principal                   |
| `src/components/BriefModal.tsx`       | Formulário, validação e download                                   | Adicionar uma pergunta ao briefing          |
| `src/components/SolutionsJourney.tsx` | Jornada de soluções, exemplos práticos e contexto do briefing      | Personalizar os objetivos e as entregas     |
| `src/components/ProjectShowcase.tsx`  | Abas e três interfaces conceituais distintas                       | Personalizar o exemplo de Website           |
| `src/components/WhoWeAre.tsx`         | Apresentação da empresa e suas especialidades                      | Revisar a descrição dos serviços            |
| `src/components/ClientVision.tsx`     | Intenções do visitante, abordagem da equipe e contexto do briefing | Personalizar a conversa sobre cada objetivo |
| `src/components/ui.tsx`               | Peças reutilizáveis, como botão, campo e janela                    | Ajustar o visual de um botão                |
| `src/index.css`                       | Cores, tamanhos e adaptação ao celular                             | Trocar a variável `--blue`                  |
| `src/main.tsx`                        | Entrada do React e carregamento da fonte                           | Entender como o app começa                  |
| `index.html`                          | Título, descrição e metadados da página                            | Atualizar a descrição da empresa            |
| `public/favicon.svg`                  | Ícone da aba do navegador                                          | Personalizar o símbolo da marca             |
| `vite.config.ts`                      | Configuração de Vite, React e Tailwind                             | Entender o endereço local                   |
| `wrangler.jsonc`                      | Configuração futura de Cloudflare Pages                            | Escolher o nome do projeto ao publicar      |

React funciona como peças de montar. Vite é a oficina que liga e empacota a página. TypeScript confere os formatos dos dados. Tailwind fornece utilitários visuais, junto do CSS específico da página. ESLint revisa padrões problemáticos.

## Conferir antes de salvar uma etapa

```powershell
npm run lint
npm run typecheck
npm run build
npm run preview
```

`lint` revisa o código; `typecheck` confere tipos; `build` prepara a pasta `dist`; `preview` mostra essa versão pronta localmente. Build não publica o site. O endereço do preview aparece no terminal.

Para padronizar a formatação:

```powershell
npm run format
```

Testes de uso: confira o menu em 390px, os links entre seções, todos os exemplos de projeto e perguntas frequentes. Abra o briefing, teste campos inválidos, prepare um exemplo, edite novamente e baixe o arquivo. Confira Escape e navegação por teclado.

## Salvar no Git e GitHub

O Git guarda o histórico local. O GitHub guarda uma cópia online. A pasta está preparada com `.gitignore` para excluir dependências, build e arquivos secretos. Nenhum remoto foi criado ou configurado nesta entrega.

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

## Evoluir com as outras dicas do guia

Veja [docs/PROXIMOS-PASSOS.md](docs/PROXIMOS-PASSOS.md). O próximo passo é personalizar a marca e definir um contato real; depois, se necessário, adicionar uma API com validação, proteção contra abuso e dados de teste.
