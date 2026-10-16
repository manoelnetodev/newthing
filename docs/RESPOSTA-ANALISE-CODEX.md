# Revisão e implementação da auditoria

## Resultado da implementação — 16/10/2026

Os sete apontamentos têm fundamento e receberam correções. As recomendações foram adaptadas para preservar a identidade preta e azul, as fotos originais e os exemplos que só aparecem ao clicar. O relatório do Gemini foi mantido integralmente; a análise inicial abaixo permanece como registro anterior à implementação.

| Item                 | Alteração aplicada                                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Navegação         | Cabeçalho e rodapé compartilham uma única lista, na mesma ordem das seções, com Dúvidas incluída. O anúncio e o convite da Hero levam a Projetos. O cabeçalho também foi ajustado entre 801 e 1100 pixels para acomodar os seis links.                                   |
| 2. Quebras de linha  | Espaços explícitos preservam a separação entre palavras e frases nas quebras dos componentes ativos, inclusive quando a quebra visual é escondida no celular.                                                                                                            |
| 3. Fotos             | Nove PNGs e quatro WebPs anteriores foram arquivados fora de `public/`. Foram geradas oito variantes de 360/720 pixels, publicadas e verificadas no R2, com `srcSet`, `sizes` e reserva local.                                                                           |
| 4. CSS               | As atmosferas da vitrine agora usam variáveis próprias de cada exemplo. As duas frentes da equipe recuperam seus acentos azul e azul acinzentado. Regras duplicadas de marca foram consolidadas sem mudar a direção visual.                                              |
| 5. Leitura           | Textos extremos de 4–9 pixels nas demonstrações passaram a pelo menos 10 pixels; rótulos reais e controles relevantes usam 11–12 pixels. Grades, tabelas, indicadores, fluxos e integrações foram reorganizados nos espaços estreitos.                                   |
| 6. Limpeza e contato | Os dois componentes desconectados e seus seletores residuais foram removidos. O README reflete os componentes ativos. O link direto do WhatsApp aceita configuração opcional e mantém o contato comercial como padrão, inclusive se a variável contiver apenas símbolos. |
| 7. Foco              | Ao abrir, o briefing foca o nome, o assistente foca uma opção e os exemplos focam a aba selecionada. Avançar foca a nova etapa; voltar ao início foca a opção marcada. Escape, contenção e restauração do foco foram preservados e conferidos.                           |

### Decisões que diferem da proposta original

- **Fotos:** não foi aplicada compressão com perdas a `quality: 86`. As variantes usam WebP lossless e foram comparadas pixel a pixel à respectiva referência redimensionada, incluindo transparência. Redimensionamento é uma mudança explícita de resolução; os originais completos continuam intactos. Não se afirma que um arquivo redimensionado seja idêntico ao original em resolução completa.
- **Cores:** os três exemplos receberam atmosferas azuis distintas por intensidade e posição. A uniformidade da marca solicitada pelo cliente foi preservada; não foram introduzidas novas paletas.
- **Tipografia:** a prioridade foi aumentar os textos pequenos e acomodá-los nos layouts. Legendas puramente ilustrativas que usam escalas relativas nas miniaturas de computador continuam acompanhando a escala da prévia; não foi imposta uma troca indiscriminada em todas as declarações do projeto.
- **Acessibilidade:** ausência de espaço antes de `<br>` e foco inicial no botão Fechar não provam, isoladamente, falhas universais em leitores de tela. As mudanças melhoram a consistência textual e a navegação por teclado, sem alegar certificação de acessibilidade.

### Resultados medidos

- `dist/`: **20.430.374 → 3.502.235 bytes**, redução de **82,9%** no diretório publicado. Esse tamanho não representa o download inicial de cada visitante.
- Quatro fotos a 360 pixels: **445.690 bytes**, cerca de **89,5%** menos que os quatro WebPs anteriores. A 720 pixels: **1.771.172 bytes**, cerca de **58,2%** menos. O navegador escolhe as variantes conforme o espaço e a densidade da tela.
- Os **13 arquivos arquivados** foram comparados por SHA-256 às versões do Git: bytes idênticos. As **oito publicações no R2** também foram verificadas contra os arquivos locais.
- `dist/team/` contém somente as oito variantes, totalizando **2.216.862 bytes**. Os originais não entram no build.

### Validação executada

- `npm run lint`, `npm run typecheck`, `npm run build` e `git diff --check`: aprovados.
- **63 combinações** das nove demonstrações nas resoluções 320×568, 360×800, 390×844, 768×1024, 1180×820, 1366×768 e 1920×1080: seleção correta, janela dentro da tela e ausência dos transbordamentos horizontais verificados.
- **36 combinações** de Dashboard/SaaS/Website com PC/Tablet/Android/iOS nas larguras 320, 768 e 1366 pixels: sem os transbordamentos de página ou conteúdo verificados. Dois indicadores do SaaS foram reorganizados após identificar texto excedente no celular de 320 pixels.
- Cabeçalho conferido também nas fronteiras de 802, 820, 880, 900 e 1024 pixels, sem sobreposição entre navegação e CTA.
- Teclado: abertura do assistente e briefing, avanço e retorno, foco na opção marcada, contenção com Tab/Shift+Tab, seleção de abas por setas, Escape e restauração do foco. Menu móvel fecha ao escolher Dúvidas e ao pressionar Escape.
- Filtros: Trimestre atualiza a receita para R$ 238.400; Em revisão exibe somente a execução pausada e seu detalhe correspondente.
- Briefing: o formulário gerou o resumo, focou o título da revisão e apresentou o link `wa.me/556293022434` com o texto preenchido. O teste não acionou o link nem enviou mensagem.
- As quatro fotos carregaram pelas URLs responsivas do R2. A versão compilada também foi aberta e conferida para navegação, atmosferas distintas, foco inicial e filtros. Não houve erros ou avisos de console nos testes finais.

Os testes de tamanho usam emulação de viewport no navegador disponível. Não substituem testes físicos em aparelhos, execução em Safari/Firefox ou avaliação com NVDA/VoiceOver. O registro de geometria e seleção está em [VALIDACAO-AUDITORIA-POS-CODEX.json](VALIDACAO-AUDITORIA-POS-CODEX.json).

## Análise inicial preservada

Conferi os sete itens diretamente no código, nos scripts e no `dist/` existente. **Todos têm fundamento, mas algumas conclusões e correções propostas precisam de ajustes.** A análise inicial abaixo foi estática, antes da implementação e dos testes registrados acima.

1. **Ordem do menu e destinos de rolagem — confirmado, com ressalvas.**

   Em [App.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/App.tsx:443), o cabeçalho apresenta `Início → Soluções → Como fazemos → Projetos → Quem somos`. A montagem da página, na linha 565, segue `Início → Projetos → Soluções → Como fazemos → Quem somos → Dúvidas`. O rodapé também coloca Projetos depois de Como fazemos.

   A barra de anúncio e o convite da Hero apontam para `#solucoes`, passando pela seção Projetos. No anúncio, isso é especialmente incoerente porque “Conheça as possibilidades” corresponde ao título “POSSIBILIDADES” da vitrine.

   **Ressalva:** os links têm destinos existentes; não estão quebrados. A ausência de Dúvidas no cabeçalho também não constitui, isoladamente, uma falha técnica. O problema principal é a consistência da navegação. O convite da Hero pode legitimamente levar a Soluções, dependendo da intenção editorial.

   **Plano:** alinhar cabeçalho e rodapé à sequência visual; direcionar o anúncio para `#projetos`; definir o destino do convite da Hero conforme sua mensagem. Centralizar os dados de navegação em uma lista compartilhada e conferir o espaço disponível no cabeçalho caso Dúvidas seja incluído.

2. **Espaços junto às quebras de linha — confirmado; impacto acessível exige validação.**

   A correção em [ProjectShowcase.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/ProjectShowcase.tsx:498) já existe: há `{' '}` antes das quebras nos dois textos mencionados.

   Permanecem sem espaço explícito o CTA de [App.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/App.tsx:616) e os trechos de [JourneyDemo.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/JourneyDemo.tsx:244). Uma renderização isolada do JSX confirmou, por exemplo, `<h5>Do interesse<br/>à conversa certa.</h5>`.

   **Ressalva:** `<br>` representa uma quebra semanticamente. A ausência de espaço nos nós de texto não prova que todos os leitores de tela pronunciarão palavras coladas. O defeito visual fica inequívoco quando o `<br>` recebe `display: none`; a regra encontrada faz isso especificamente no parágrafo Forma, que já está corrigido.

   **Plano:** acrescentar espaços explícitos nas separações textuais restantes, incluindo separações entre frases quando necessário. Revisar os demais `<br>` desses arquivos, preservando as quebras visuais, e validar os textos responsivos e a leitura assistiva.

3. **Peso das imagens e PNGs no build — confirmado, com dependências adicionais.**

   Os tamanhos medidos foram:

   | Conteúdo                    |          Tamanho |
   | --------------------------- | ---------------: |
   | Nove PNGs em `public/team/` | 14.906.463 bytes |
   | Quatro WebPs locais         |  4.238.252 bytes |
   | `dist/` completo existente  | 20.430.374 bytes |

   Os PNGs também estão presentes em `dist/team/`. Os quatro WebPs mantêm **1122 × 1402**, com transparência.

   Há dois detalhes relevantes. Primeiro, [teamPhotos.ts](C:/Users/User/Desktop/página%20newthig/base-app/src/data/teamPhotos.ts:1) usa URLs do **R2**, com WebPs locais como reserva. Segundo, [WhoWeAre.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/WhoWeAre.tsx:158) já aplica `loading="lazy"` e `decoding="async"`. Portanto, os 20,43 MB do diretório publicado não equivalem ao download inicial de cada visitante; os retratos continuam pesados quando solicitados.

   **Plano:** mover os originais para `assets-src/team/`, atualizar o caminho de entrada e gerar versões responsivas com `srcset` e `sizes`, dimensionadas pela largura real dos retratos. Há cards que chegam a 420 px, então 640 px não garante resolução 2× em todos os layouts. Avaliar qualidade, transparência e recorte antes de fixar um orçamento de bytes; os 45–80 KB sugeridos são uma meta a verificar.

   A alteração precisa abranger [optimize-team-photos.mjs](C:/Users/User/Desktop/página%20newthig/base-app/scripts/optimize-team-photos.mjs:20) e [upload-team-photos.mjs](C:/Users/User/Desktop/página%20newthig/base-app/scripts/upload-team-photos.mjs:26). O primeiro exige igualdade exata de pixels e dimensões; o segundo exige `pixelsIdentical`. Redimensionar ou usar compressão com perdas exige revisar essas verificações, os manifestos e a documentação. Também será necessário republicar os novos arquivos no R2.

4. **Colisões na cascata CSS — confirmado; o relatório não cobre toda a cadeia.**

   A ordem em [main.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/main.tsx:4) coloca os estilos globais de marca e atmosfera depois dos componentes. No CSS compilado existente, confirmei que a regra de `atmosphere.css` aparece depois das variantes da vitrine e sobrescreve seus fundos.

   Existe ainda uma sobrescrita intermediária em [DevicePreview.css](C:/Users/User/Desktop/página%20newthig/base-app/src/components/DevicePreview.css:62): `.showroom-card .showroom-visual` já impõe um fundo comum. **Remover apenas a regra de `atmosphere.css` não basta.**

   Também se confirmam a uniformização das variáveis da equipe em [brand.css](C:/Users/User/Desktop/página%20newthig/base-app/src/styles/brand.css:296) e as declarações repetidas de anúncio, cabeçalho, seções e rodapé. Uma precisão: `atmosphere.css` volta a sobrescrever as seções citadas, mas não redefine anúncio, cabeçalho e rodapé.

   **Plano:** concentrar as variantes visuais nos componentes, usando variáveis para fundos e acentos; deixar valores gerais e padrões nas folhas globais. Consolidar as declarações duplicadas preservando conscientemente o resultado desejado. Validar as três abas, todos os dispositivos da vitrine e as duas áreas da equipe. Apenas reordenar imports pode provocar outras regressões.

5. **Microtipografia — confirmado; a contagem precisa ser interpretada corretamente.**

   Contei **320 declarações diretas de `font-size` entre 4 e 10 px**, mais uma fonte de 9 px declarada pelo atalho `font` em [JourneyExplorer.css](C:/Users/User/Desktop/página%20newthig/base-app/src/components/JourneyExplorer.css:49). Isso explica a diferença entre o título do relatório e a soma das ocorrências por arquivo: considerando essa declaração, são **321**.

   Os valores de 4 px em [JourneyPreviewDetails.css](C:/Users/User/Desktop/página%20newthig/base-app/src/components/JourneyPreviewDetails.css:1529) existem. Também confirmei controles funcionais nas demonstrações, como os botões de período de `NexoEvolution`; não se trata apenas de texto decorativo.

   **Ressalva:** contar declarações não equivale a contar elementos efetivamente exibidos. Há regras condicionais, sobrescritas e valores em `clamp()` que exigem conferir o tamanho computado.

   **Plano:** priorizar rótulos e controles funcionais, adotando pelo menos 11–12 px para textos auxiliares e uma escala maior para ações. Reorganizar tabelas, gráficos e grades nos contêineres estreitos para acomodar as fontes. Uma substituição numérica em massa pode gerar cortes e sobreposições. Validar legibilidade, zoom, áreas clicáveis e as sete resoluções do relatório.

6. **Código morto e WhatsApp configurável — confirmado, com diferenças de impacto.**

   O grafo de imports a partir de `src/main.tsx` confirma que `ClientVision.tsx` e `PartnershipPillars.tsx` estão desconectados. Somados aos respectivos CSS, ocupam **48.138 bytes no código-fonte**.

   **Esses arquivos próprios não entram no bundle atual**, pois não são importados. O desperdício no CSS distribuído vem das regras residuais em folhas globais e outras folhas ainda carregadas. Os seletores citados estão presentes no CSS de `dist/`, sem uso nos componentes ativos.

   O README ainda apresenta `ClientVision` como ativo na linha 52; não encontrei ali uma entrada equivalente para `PartnershipPillars`.

   Em [BriefModal.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/BriefModal.tsx:28), o número está fixo. `.env.local` define a variável, mas ela não é consultada. Como os números coincidem hoje, o contato funciona; a falha aparece quando a configuração muda.

   **Plano:** remover os componentes abandonados, limpar os seletores sem uso e atualizar o README. Para o WhatsApp, normalizar a variável para dígitos e aplicar o valor padrão **depois da normalização**, evitando um número vazio caso a configuração contenha apenas espaços ou símbolos. Documentar que a configuração é incorporada durante o build e conferir a URL gerada.

7. **Foco inicial dos modais — conflito confirmado; solução sugerida é incompleta.**

   Em [ui.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/ui.tsx:47), o modal abre e tenta focar o primeiro `input`. Em [SolutionFinder.tsx](C:/Users/User/Desktop/página%20newthig/base-app/src/components/SolutionFinder.tsx:157), outro efeito foca o painel na montagem e em toda mudança de etapa. São duas rotinas disputando a definição do foco inicial.

   No modal de demonstração, a aba selecionada existe, mas não há uma política explícita para focá-la. Focar o botão Fechar não constitui, por si só, uma violação de acessibilidade; a aba pode ser um destino mais útil nesse contexto.

   A proposta do relatório tem duas limitações: `querySelector('input, ...')` retorna o primeiro elemento na ordem do DOM, sem estabelecer prioridade entre os seletores; e condicionar o efeito a `step > 0` deixa sem tratamento o retorno à etapa zero pelos botões Voltar e Rever respostas.

   **Plano:** permitir que cada modal declare explicitamente seu alvo inicial. No assistente, distinguir abertura de transições e tratar avanço, retorno e reinício, focando um controle ou título adequado à etapa. Preservar Escape, contenção e restauração do foco já existentes. Validar os fluxos completos por teclado, inclusive no `StrictMode`.

Eu começaria pelas correções pontuais de navegação, espaços, configuração do contato e foco; depois trataria imagens, cascata e reorganização tipográfica, concluindo com a limpeza do código. Após a implementação, executaria lint, verificação de tipos e build, além das verificações visuais e de teclado descritas acima. Os resultados anteriores registrados no relatório não substituem essa validação.
