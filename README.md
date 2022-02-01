# desafio-tecnico-stone


## DESAFIO - Processamento de Cobrança
O objetivo do desafio é avaliar a capacidade de construir um cenário de processamento de cobrança baseada em micro serviços. Será levado em conta na avaliação os padrões de projeto aplicados, a cobertura de testes e a performance da aplicação. A aplicação deve possuir testes unitários, de integração e de performance.


## Tecnologias

### Arquitetura da aplicação
* <a href="https://github.com/expressjs/express" target="_blank">ExpressJS</a>

### Bancos de dados
> como foi pedido não é necessario instalar nada, utilizei creditos para estudante na google cloud
* <a href="https://cloud.google.com/sql" target="_blank">PostgreSQL 13</a>
* <a href="https://cloud.google.com/firestore" target="_blank">Firestone</a>

### logger e test
* <a href="https://www.npmjs.com/package/morgan" target="_blank">morgan</a>
* <a href="https://www.npmjs.com/package/mocha" target="_blank">mocha</a>
* <a href="https://www.npmjs.com/package/chai" target="_blank">chai</a>
* <a href="https://www.npmjs.com/package/chai-http" target="_blank">chai-http</a>

## Baixando o código fonte
```
$ git clone https://github.com/Jovanio-Junior/desafio-tecnico-stone.git
```
> Para que seja possivel executar o codigo, é necessario adicionar os arquivos 'dbNoSQL.js' e 'dbSQL.js' a pasta 'database', os arquivos foram enviados a recrutadora. Os mesmos são dados para conexão com o banco de dados utilizado.

### Instalação
> OBS: Adicionar 'dbNoSQL.js' e 'dbSQL.js' a pasta 'database 
> dbNoSQL {apiKey: -, authDomain: -,projectId: -}
> dbSQL { host, database, user, password }

    cd desafio-tecnico-stone
    npm install

    cd clientes-api
    npm install
    npx kenx migrate:rollback
    npx knex migrate:latest
    npx knex seed:run  
>- gera de 1000 a 10000 clientes validos 
>foi utilizado um package para gerar o cpf e nome, os estados fora definidos aleatoriamente para cada cliente

    cd cobrancas_api
    npm install



### tests

> para a realização dos testes foi utilizado o mocha e o chai
    cd cliente-api
    npm test

    cd cobranca_api
    npm test

    


### Execução
>É necessario executar todos simultaneamente
    *Terminal 1
    cd desafio-tecnico-stone
    npm start

    *Terminal 2
    cd clientes-api
    npm start

    *Terminal 3
    cd cobrancas_api
    npm start



## Documentação
foi gerada utilizado open api para node 

## Rotas
    Api-gateway
    |   post - /clientes/cadastro   - cadastro de clientes
    |   post - /clientes/consulta   - consulta de clientes
    |   get - /clientes/consulta    - consulta de clientes por estado
    |   
    |   post - /cobranca/cadastro   - cadastro de cobrança
    |   get - /cobranca/consulta    - consulta de cobrança
    |   
    |   get - /gerar-consumo    - gera consumo para todos os clientes cadastrado

## Arquitetura simplificada
	Desafio
	├── clientes-api
	│   └── index.js rotando na porta 9000
	├── cobranca_api
	│   └── index.js - rodando na porta 9001
	└── index.js - rodando na porta 10000

## microservice
estou utilizando uma API Gateway que ira funcionar como um proxy, analisa a requisição e direciona a mesma para o serviço adequado. Logo o cliente não precisa ter conhecimento dos demais serviços para ele existira apenas 1 serviço que sera oque ele fara as request.



## Licença
Projeto desenvolvido sob licença do MIT.