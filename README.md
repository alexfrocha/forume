![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
# Fórum MERN
Este é um fórum desenvolvido com a stack MERN (MongoDB, Express, React, Node.js). O fórum permite que os usuários postem tópicos e comentários, além de fazer buscas por tópicos e tags.

![forume](https://user-images.githubusercontent.com/107084445/224728431-9421f4f0-3296-4190-a9b2-61ecf8818344.png)

### Instalação <br>
Para instalar e executar o projeto, siga as seguintes etapas:
<br> <br>
Clone o repositório para o seu computador:
```git
git clone https://github.com/seu-usuario/forum-mern.git
```

Instale as dependências do servidor e do cliente:
```git
cd forume
cd backend
npm install
```

Configure as variáveis de ambiente criando um arquivo .env na raiz do projeto e definindo as seguintes variáveis:
```js
PORT=3001
MONGODB_URI=mongodb://localhost:27017/forum
JWT_SECRET=suachavejwtsecreta
```

Inicie o servidor:
```
npm start
```

Inicie o cliente em um terminal separado:
```
cd frontend
npm start
```

Acesse o fórum em seu navegador em https://localhost:3000.

### Tecnologias utilizadas
MongoDB: banco de dados NoSQL para armazenar os dados do fórum <br>
Express: framework para construir a API REST do servidor <br>
React: biblioteca para construir a interface do usuário <br>
Node.js: plataforma para executar o servidor e a API REST <br>
### Funcionalidades
O fórum MERN inclui as seguintes funcionalidades:

Criação de tópicos: os usuários podem criar novos tópicos com um título e uma descrição  <br>
Adição de comentários: os usuários podem adicionar comentários em um tópico existente <br>
Listagem de tópicos: os usuários podem ver uma lista de todos os tópicos, ordenados por data de criação <br>
### Contribuição
Se você quiser contribuir para o projeto, sinta-se à vontade para enviar um pull request. Certifique-se de seguir as boas práticas de programação e incluir testes automatizados para suas alterações.

### Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
