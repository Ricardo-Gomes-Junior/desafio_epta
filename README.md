# 💻 Desafio Técnico - Vaga Fullstack

Projeto desenvolvido para desafio técnico Full Stack, com foco em demonstrar domínio em tecnologias modernas e boa experiência do usuário.
Todo o sistema foi desenvolvido seguindo boas práticas, como:

- Separação clara de responsabilidades entre front-end e back-end
- Uso do React Context API para compartilhamento de dados entre componentes
- Integração com banco de dados relacional via Prisma ORM
- Autenticação utilizando JWT
- Estilização com Tailwind CSS
- Configuração de ambiente com Docker

---

## 🛠 Tecnologias Utilizadas

- **Front-end:** React, Vite, TypeScript, Tailwind CSS  
- **Back-end:** Node.js, Express, TypeScript, Prisma ORM  
- **Banco de Dados:** PostgreSQL (via Docker)  
- **Outros:** Docker, JWT, Context API  

---

## ⚙️ Como Rodar o Projeto

### 🔹 Front-end

1. Clone o repositório:
   ```bash
   git clone <link-do-repo>
   ```
2. Acesse a pasta:
   ```bash
   cd epta-front
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a base URL da API (utilizado `http://localhost:3333`):
   - Verifique o local de configuração da URL base (ex: `.env`, arquivo de configuração do Axios, etc.)

5. Rode o projeto:
   ```bash
   npm run dev
   ```

---

### 🔹 Back-end

1. Clone o repositório:
   ```bash
   git clone <link-do-repo>
   ```
2. Acesse a pasta:
   ```bash
   cd epta-back
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Copie o arquivo de exemplo:
     ```bash
     cp .env.example .env
     ```
   - Preencha as informações necessárias (porta, URL do banco, segredo JWT, etc.)

5. Suba o banco de dados com Docker:
   ```bash
   docker-compose up -d
   ```

6. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

7. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## 🔍 Testes de API

Caso queira testar as rotas da API, estou compartilhando o projeto do **Insomnia** com todas as requisições configuradas.

- [![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=EPTA_API&uri=file%3A%2F%2F%2FC%3A%2FUsers%2Fricar%2FDownloads%2FInsomnia_2025-04-12.yaml)

---

Qualquer dúvida, estou à disposição! 😊
