# Uma etapa de cada vez

## 1. Personalizar a landing page

Substitua Newthing pela sua marca e revise os serviços. Adicione somente informações verificáveis: contatos reais, trabalhos autorizados e depoimentos verdadeiros. As interfaces em “Possibilidades” são exemplos, não cases de clientes.

Exercício: “Troque o nome da marca e os três serviços. Mantenha o layout responsivo. Rode lint, tipos e build e confira a página no celular.”

## 2. Conectar o contato

Defina o destino: WhatsApp com um número fornecido por você, e-mail ou API. Hoje o botão prepara um arquivo local. Ao integrar, deixe claro o que será enviado, trate erros e só mostre sucesso após uma resposta real.

Uma API é o garçom: recebe o pedido da tela, valida e leva para o serviço adequado. A validação do navegador melhora a experiência, mas o servidor também precisa validar os campos, tamanho do conteúdo e limites de uso.

## 3. Adicionar Pages Functions ou Workers

Crie uma rota de API, por exemplo `POST /api/briefings`. Confira os dados no servidor, aplique proteção contra abuso e registre apenas o necessário. Credenciais ficam em secrets do servidor; nunca coloque um token em uma variável pública com prefixo `VITE_`.

Use um ambiente local ou de teste primeiro. Não adicione uma rota pública para listar briefings privados. Uma área administrativa requer autenticação e autorização reais, com uma solução madura.

## 4. Guardar registros no D1

O D1 é o fichário. Planeje a tabela, registre a mudança em uma migração e conecte o banco ao servidor com um binding. O React fala com a API, não diretamente com o banco.

Separe bancos de teste e produção. Valide os pedidos no servidor e use consultas com parâmetros. Antes de adicionar dados pessoais, defina quem pode acessá-los, por quanto tempo serão guardados e como serão removidos.

## 5. Guardar arquivos no R2

O R2 é o depósito. Adicione uploads apenas quando houver necessidade. Verifique autenticação, autorização, tipo e tamanho no servidor. Arquivos privados precisam de acesso controlado; não use um bucket público para documentos de clientes.

## 6. Publicar e verificar

Cloudflare Pages mostra o frontend. Functions/Workers executam regras. Bindings conectam recursos ao servidor. Wrangler configura e testa essas conexões. Publicar o frontend não cria automaticamente D1, R2 ou autenticação.

Use preview para revisar e recursos separados para produção. Confira formulário, celular, teclado, estados de erro, destino de contato e qualidade do código. Salve um commit pequeno com a etapa concluída.
