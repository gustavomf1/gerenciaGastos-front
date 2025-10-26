📊 Gerenciador de Gastos

Uma aplicação web completa (Full Stack) para gerenciamento de finanças pessoais, permitindo o rastreamento de receitas e despesas, criação de orçamentos mensais e gerenciamento de categorias.

O projeto é construído com C# ASP.NET Core para o backend (API) e React.js para o frontend (Cliente).

✨ Funcionalidades

Autenticação de Usuários: Sistema de Registro e Login (via POST /api/Usuario e POST /api/Seguranca).

CRUD de Transações: Funcionalidade completa para Criar, Ler, Editar e Excluir receitas e despesas.

CRUD de Orçamentos: Funcionalidade completa para Criar, Ler, Editar e Excluir orçamentos mensais (com barra de progresso visual).

CRUD de Categorias: Funcionalidade completa para Criar, Ler, Editar e Excluir categorias de gastos.

Interface Reativa: Frontend construído em React com navegação (React Router) e estilização (CSS Modules).

🛠️ Tecnologias Utilizadas

Aqui estão as principais tecnologias usadas para construir este projeto.

Backend (API)

C# e .NET: 8.0 (Target Framework)

ASP.NET Core: Para a construção da API RESTful.

Entity Framework Core: Para o mapeamento Objeto-Relacional (ORM).

Autenticação: Microsoft.AspNetCore.Authentication.JwtBearer (Tokens JWT).

Banco de Dados: SQL Server (Verificar appsettings.json).

Validação: FluentValidation.

Frontend (Cliente)

Node.js: v20.18.1

React: [VERSÃO DO REACT, ex: v18.3.1] (Verificar no package.json)

Roteamento: react-router-dom

Requisições HTTP: axios

Decodificação de Token: jwt-decode

Estilização: CSS Modules.

🚀 Como Executar o Projeto

Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado:

.NET SDK (8.0.400)

Node.js (v20.18.1)

Um SGBD compatível (ex: SQL Server Express)

1. Backend (C# API)

Clone o repositório:

git clone [https://github.com/](https://github.com/)[SEU-USUARIO-GIT]/[NOME-DO-REPOSITORIO].git


Navegue até a pasta do backend:

cd [CAMINHO-PARA-O-PROJETO]/gerenciaGastos


Configurar o Banco de Dados:

Abra o ficheiro appsettings.json.

Altere a "DefaultConnection" na ConnectionStrings para apontar para o seu servidor de banco de dados local.

Instale as dependências e aplique as migrations (crie o banco):

dotnet restore
dotnet ef database update


Execute o backend:

dotnet run


A API estará rodando em https://localhost:7032.

2. Frontend (React App)

Num novo terminal, navegue até a pasta do frontend:

cd [CAMINHO-PARA-O-PROJETO]/gerencia-gastos-front


Instale os pacotes NPM:

npm install


Execute o frontend:

npm start


O cliente React estará rodando em http://localhost:3000.

(O app abrirá automaticamente no seu navegador).