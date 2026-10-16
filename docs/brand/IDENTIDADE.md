# Identidade Newthing

O refinamento preserva os elementos da marca enviada: seta azul apontando para o círculo aberto. A assinatura `NEWTHING.` retoma o desenho compacto do site anterior, agora em maiúsculas e sem espaço entre as palavras, com o ponto azul e `APPS` como descritor secundário. A referência de exploração foi criada com a ferramenta integrada de imagens; as artes finais foram reconstruídas como SVG para uso real, sem fundo e com a escrita convertida em curvas.

## Arquivos finais

Em `public/brand/`:

- `newthing-horizontal-dark.svg` e `newthing-horizontal-light.svg`: cabeçalho, rodapé e assinaturas horizontais.
- `newthing-stacked-dark.svg` e `newthing-stacked-light.svg`: composição vertical.
- `newthing-symbol-dark.svg` e `newthing-symbol-light.svg`: símbolo isolado.
- `newthing-wordmark-dark.svg` e `newthing-wordmark-light.svg`: escrita isolada, usada com o símbolo animado no site.
- As mesmas composições em PNG com transparência.
- `newthing-identidade.png` e `.svg`: prancha de apresentação da marca.

`dark` identifica a aplicação sobre fundo escuro: círculo e escrita brancos. `light` identifica a aplicação sobre fundo claro: círculo e escrita quase pretos. A seta permanece azul nas duas versões. O favicon usa a mesma geometria. O componente `BrandMark` aplica o símbolo nos diagramas.

## Cores e aplicação

| Função | Cor |
| --- | --- |
| Azul principal da marca | `#087CFF` |
| Preto de fundo | `#0A0D12` |
| Branco da marca | `#F4F7FB` |
| Azul dos botões com texto branco | `#0868E2` |
| Azul suave para indicações e conexões | `#8CC0FF` |

O azul direciona ações, conexões e seleção. Preto e branco organizam contraste e leitura. Todas as seções e prévias usam fundo preto/grafite com aura azul suave. Os exemplos mantêm layouts diferentes, com cores da mesma família. As fotografias mantêm a aparência natural e os fundos pretos. Verde e âmbar ficam reservados a estados funcionais, como confirmação e revisão. O favicon está disponível em SVG e ICO; o ícone de favoritos para dispositivos Apple está em PNG.

Não distorcer a proporção do símbolo, colocar a seta azul sobre um fundo azul semelhante ou eliminar a abertura entre a seta e o círculo. Usar a versão com contraste adequado ao fundo. A escrita em curvas usa Inter 650, derivada da fonte OFL já incluída no projeto.

## Reprodução dos SVGs

`scripts/build_brand_assets.py` gera os oito SVGs e o favicon a partir da fonte Inter do projeto. Requer `fonttools` e `brotli`; esses pacotes são ferramentas de preparação, não dependências de execução do site. Os SVGs finais já estão prontos para uso.

O site anima apenas o símbolo: impulso sutil da seta, fluxo azul percorrendo o arco e uma aura leve. A escrita permanece estável. O ciclo é contínuo, respeita a preferência por redução de movimento e os controles locais dos diagramas.

## Prompt da exploração visual

Ferramenta: geração de imagens integrada, edição da referência enviada, fundo transparente.

> Refine the supplied New Thing Apps logo into one serious production-ready flat vector-style brand symbol, transparent background. Preserve its exact core identity: a thick open circular black ring below and a bold blue diagonal arrow above pointing down-right toward the ring's upper opening. The arrow and open ring must remain clearly recognizable from the original; do not replace them with an N, cursor, brackets or generic swoosh. Improve geometric precision, optical balance, intentional negative space and proportions, so it works at small digital icon sizes. Ring should be geometrically circular, thick and open across its upper quarter. Use near-black #101828 for ring, Newthing royal blue #3267FF for arrow. Keep a clear separation between arrow and ring. No text, no background, no gradients, no 3D, no shadows, no mockup, no other symbols. One single centered symbol only, tightly framed with a modest safe margin. This symbol will anchor a sophisticated dark technology website and a professional company identity.

A arte final em curvas usa o azul `#087CFF`, alinhado à referência original e à direção solicitada para o site. A escrita foi finalizada em `NEWTHING.` após o ajuste pedido durante a implementação.
