# Fotos da equipe: compressão sem perdas e R2

Os quatro retratos usados no site foram convertidos de PNG para **WebP lossless**, sem redimensionamento. A opção `exact` preserva inclusive os canais RGB dos pixels totalmente transparentes. O processo decodifica os dois formatos em RGBA e exige igualdade de todos os bytes antes de salvar a versão otimizada.

Os PNGs originais e as versões anteriores foram preservados. O relatório `TEAM-PHOTO-OPTIMIZATION.json` registra dimensões, tamanhos, hashes e validação. Os arquivos WebP estão em `public/team/optimized/`, com hash no nome para permitir cache imutável.

## Estado do R2

As quatro fotos foram publicadas no bucket exclusivo **`newthing-media`**, na conta parceira autorizada. O site usa os endereços do R2 em `https://pub-3a898b56bec94bd5baa3627d4f5c9ac5.r2.dev/team/`, com alternativas WebP locais em caso de falha de carregamento.

Cada endereço público respondeu com sucesso, com `Content-Type: image/webp` e conteúdo SHA-256 idêntico ao arquivo otimizado local. O comprovante está em `TEAM-PHOTO-PUBLICATION.json`. O conjunto passou de 7.057.936 para 4.238.252 bytes (aproximadamente 40% menor), mantendo as dimensões de 1122 × 1402 e todos os pixels.

O endereço `r2.dev` está ativo, mas a [Cloudflare o destina a desenvolvimento e aplica limites de requisições](https://developers.cloudflare.com/r2/buckets/public-buckets/). Para tráfego de produção, conecte ao bucket um domínio próprio da Newthing e republique o manifesto com esse domínio. A alternativa local mantém as fotos disponíveis se o endpoint público falhar.

## Publicar ou atualizar as fotos

Use um bucket destinado às imagens públicas da Newthing, com domínio público já configurado. Não habilite acesso público em um bucket que contenha documentos privados.

```powershell
npm run photos:upload -- NOME-DO-BUCKET https://DOMINIO-PUBLICO-DAS-IMAGENS
```

O script utiliza a autenticação local do Wrangler, sem gravar tokens no código. Envia somente os quatro WebP verificados, com `Content-Type: image/webp` e cache de um ano. Depois, baixa cada endereço público e compara o SHA-256 com o arquivo local. Só altera `src/data/teamPhotos.ts` quando todos os downloads forem idênticos. Também salva o comprovante em `TEAM-PHOTO-PUBLICATION.json`.

Na conta parceira, selecione o identificador autorizado por meio da variável `CLOUDFLARE_ACCOUNT_ID` antes de executar o upload. A publicação não depende de credenciais no frontend.

O componente mantém uma alternativa local para falhas de carregamento. Após publicar, execute os checks e faça commit/push das URLs verificadas e do comprovante.

Para gerar novamente os WebP a partir dos PNGs originais:

```powershell
npm run photos:optimize
```

Essa geração volta o manifesto aos caminhos locais; execute o upload novamente para publicar e verificar os novos arquivos no R2.
