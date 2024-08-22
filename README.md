## SENAI-CETIQT_FrontendTest

Um projeto com a finalizade de testar a proficiência em tecnologias frontend, onde foi desenvolvido um formulário em HTML e CSS com validações em Typescript. Foi utilizado o Webpack para a modularização e execução do projeto em tempo real.

## Pré requisitos para inicialização

Para iniciar a aplicação, serão necessários os seguintes requisitos:

- Git;
- SSH configurada no Git e no Github;
- Node (versão 20) e npm;

## Primeiros passos

Com todos os requisitos instalados, podemos baixar o projeto através do seguinte comando:

```sh
git clone git@github.com:RodrigoVieira06/SENAI-CETIQT_FrontendTest.git
```

E navegar até o diretório gerado

```sh
cd SENAI-CETIQT_FrontendTest
```

Vamos instalar as dependência necessárias para rodar a aplicação

```sh
npm install
```

Agora, podemos iniciar a execução do projeto e gerar o build do app para produção com a pasta dist.

Para iniciar:

```sh
npm start
```

Com esse comando, o Webpack dará início ao live server, abrindo na porta 8080 de seu localhost. Uma janela do navegador será aberta automaticamente quando for concluído.

Por fim, podemos gerar o build com a seguinte execução no terminal:

```sh
npm run build
```

Uma pasta dist será gerada pelo Webpack na raiz do projeto e, dentro dela, o conteúdo html, css e js estarão disponíveis para serém utilizados pelo navegador.
