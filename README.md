# MyLinks

Este é um projeto de links sociais desenvolvido com React, TypeScript e Firebase. Ele permite que o usuário adicione e gerencie links para suas redes sociais em uma interface simples e intuitiva.

## Tecnologias Utilizadas
- React
- TypeScript
- Firebase (Firestore)

## Como Executar o Projeto
1. Clone o repositório:
   ```bash
   git clone git@github.com:pedroazevedoc/myLinks.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd myLinks
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
5. Abra o navegador e acesse `http://localhost:5173` para visualizar o projeto.

## Como Configurar o Firebase
1. Crie um projeto no [Firebase](https://firebase.google.com/).
2. Adicione um aplicativo web ao projeto e copie as configurações fornecidas.
3. Clone o arquivo `.env.local.example` e renomeie para `.env.local`.
4. Adicione as configurações do Firebase no arquivo `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
5. Salve o arquivo e reinicie o servidor de desenvolvimento.
6. Adicione um usuário no Firebase Authentication para acessar a página de gerenciamento de links.
7. Acesse a rota `/admin` e faça login com o usuário criado para gerenciar os links sociais.