<br>
<br>
<h1 align="center" > Gateway de Software</h1>
<p align="center"> Gateway de acessos microsserviços Windris</p>
<br>
<br>

# Índice

- [Configuração de ambiente](#configuração-de-ambiente)
  -[Dependências](#dependências)

## Configuração de ambiente
Os microsserviços Windris utilizam Docker e Docker-Compose para facilitar a configuração de ambiente. 

Como o Gateway de Software é o principal ponto de entrada para aplicação e é necessário para acessar os demais serviços, o arquivo docker-compose se encontra nesse repositório.

Os demais repositórios devem estar na raiz da pasta onde está o Software Gateway, por exemplo:
/windris/software_gateway
/windris/user_service


### Dependências

Inicialmente, instale localmente as seguintes dependências:

1. Instale o [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/);
2. Instale o [Docker Compose](https://docs.docker.com/compose/install/).

Esta aplicação utiliza o envio de emails que pode ser habilitada ou desabilitada através da variável de ambiente MAIL_ENABLED no arquivo de configuração de ambiente.

Uma sugestão de servidor de email para desenvolvimento é o https://mailtrap.io, basta criar conta e inserir as credenciais no arquivo de configuração de ambiente como MAIL_USER e MAIL_PASS.


### Subindo a aplicação
Utilize os seguintes comandos para subir a aplicação

```
cp .env.sample .env

sudo docker-compose up

# Execute as migrações e o seed do banco de dados
sudo docker-compose exec user_service npx sequelize-cli db:migrate
sudo docker-compose exec user_service npx sequelize-cli db:seed:all

# Execute o seed do data storage
sudo docker-compose exec data_storage npm run seed
```

### Rotas atuais

Atualmente, a única rota desprotegida é /user_service/auth pois é utilizada para login

- POST `/user_service/auth`
Request Body:
```
{
  "password": "123456",
  "email": "admin@email.com"
}
```

Response Body:
```
{
    "id": "048892fb-3a3a-4980-83a4-bdd5d2a290ed",
    "email": "admin1@email.com",
    "name": "admin",
    "isAdmin": true,
    "createdAt": "2021-04-10T18:00:29.310Z",
    "updatedAt": "2021-04-10T18:00:29.310Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0ODg5MmZiLTNhM2EtNDk4MC04M2E0LWJkZDVkMmEyOTBlZCIsImVtYWlsIjoiYWRtaW4xQGVtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbiIsImlzQWRtaW4iOnRydWUsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMTBUMTg6MDA6MjkuMzEwWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMTBUMTg6MDA6MjkuMzEwWiIsImlhdCI6MTYxODE3Mjk4OSwiZXhwIjoxNjI2ODEyOTg5fQ.MAPLXzNt0hgGwgHuSg_WaMwUDNcDEKQIZwl8x6ojKGg"
}
```

As demais rotas necessitam de autenticação, portanto, precisam do seguinte cabeçalho:

Request Headers:
```
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMjg3NTYxLWIwNmMtNGVmZS04YzdjLWRhM2RhZGJmNzA1ZiIsImVtYWlsIjoiam9hb0BlbWFpbC5jb20iLCJuYW1lIjoiYWFhYWFhYWFhYmEiLCJpc0FkbWluIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMS0wNC0xMFQxNDozNDo0Ny43OTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0xMFQxNDozNDo0Ny43OTVaIiwiaWF0IjoxNjE4MDcxMzU0LCJleHAiOjE2MjY3MTEzNTR9.vUJMqhpMtfDjCHsuslXmMaKOfHtFegCqVlAtjaX6o2g",
  "Content-Type": "application/json"
}
```

### Rotas do Serviço de Usuário

Há o parâmetro de Query page a ser utilizado para fins de paginação. Por exemplo `/user_service/user?page=10`
- GET `/user_service/user`
```
[
  {
    "id": "58cdd64d-73fc-4a5d-80ff-d11bb2110cd1",
    "email": "joao@email.com",
    "name": "aaaaaaaaaba",
    "isadmin": false,
    "createdat": "2021-04-10T17:32:08.985Z",
    "updatedat": "2021-04-10T17:32:08.985Z"
  },
  {
    "id": "8069cbbd-d5c4-4928-95a6-e61b446a0dfe",
    "email": "paulo@email.com",
    "name": "paulo",
    "isadmin": false,
    "createdat": "2021-04-10T17:38:23.427Z",
    "updatedat": "2021-04-10T17:38:23.427Z"
  }
]
```

- GET `/user_service/user/:id`
```
{
  "id": "58cdd64d-73fc-4a5d-80ff-d11bb2110cd1",
  "email": "joao@email.com",
  "name": "aaaaaaaaaba",
  "isadmin": false,
  "createdat": "2021-04-10T17:32:08.985Z",
  "updatedat": "2021-04-10T17:32:08.985Z"
}
```

- POST `/user_service/user`
Request Body:
```
{
  "password": "123456",
  "email": "paulo@email.com",
  "name": "paulo"
}
```

Response Body:
```
{
  "id": "8069cbbd-d5c4-4928-95a6-e61b446a0dfe",
  "isAdmin": false,
  "email": "paulo@email.com",
  "name": "paulo",
  "updatedAt": "2021-04-10T17:38:23.427Z",
  "createdAt": "2021-04-10T17:38:23.427Z",
  "isadmin": false,
}
```

- PUT `/user_service/user/:id`

O corpo da request são os campos do perfil de usuário, sendo todos os campso opcionais
Request Body: 
```
{
  "password": "123456",
  "email": "paulo@email.com",
  "name": "paulo"
}
```

Response Body:
```
{
  "id": "8069cbbd-d5c4-4928-95a6-e61b446a0dfe",
  "isAdmin": false,
  "email": "paulo@email.com",
  "name": "paulo",
  "updatedAt": "2021-04-10T17:38:23.427Z",
  "createdAt": "2021-04-10T17:38:23.427Z",
  "isadmin": false,
}
```

### Rotas do Serviço de Device

O POST nesse endpoint é responsável por associar um usuário a um gerador. Recomenda-se a utilização de uuid v4 para id dos geradores.

- POST `/generator`
Request Body:
```
{
    "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc",
    "generatorId": "e21e048f-45f6-4a0e-88fc-bbbbbbbb123"
}
```
Response Body:
```
{
    "energyData": [],
    "climateData": [],
    "_id": "e21e048f-45f6-4a0e-88fc-bbbbbba2a3",
    "__v": 0,
    "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc"
}
```

Retorna informações sobre um gerador com dados de clima e energia omitidos
- GET `/generator/:generatorID`
```
{
    "energyData": [],
    "climateData": [],
    "_id": "e21e048f-45f6-4a0e-88fc-bbbbbba2a3",
    "__v": 0,
    "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc"
}
```
Retorna informações de clima detalhadas de um gerador específico
- GET `/generator/:generatorID/climate`
```
{
    "energyData": [],
    "climateData": [
        {
            "_id": "6073481e76ed0801e1e25477",
            "umidity": "40.0",
            "wind": "4.3",
            "createdAt": "2021-04-11T19:03:58.105Z",
            "updatedAt": "2021-04-11T19:03:58.105Z",
            "__v": 0
        },
        {
            "_id": "607348c7a9e0c001ee18a1f0",
            "umidity": "40.0",
            "wind": "4.3",
            "createdAt": "2021-04-11T19:06:47.432Z",
            "updatedAt": "2021-04-11T19:06:47.432Z",
            "__v": 0
        },
        {
            "_id": "6073492b12ec6101fd24f655",
            "umidity": "40.0",
            "wind": "4.3",
            "createdAt": "2021-04-11T19:08:27.861Z",
            "updatedAt": "2021-04-11T19:08:27.861Z",
            "__v": 0
        }
    ],
    "_id": "e21e048f-45f6-4a0e-88fc-ba4dcd0e1f9c",
    "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc",
    "__v": 7
}
```

Retorna informações de energia detalhadas de um gerador específico
- GET `/generator/:generatorID/energy`

Retorna informações sobre todos os geradores que pertencem ao usuário
- GET `/generator/user/:userId`
```
[
    {
        "energyData": [],
        "climateData": [
            "607356f069925c00d973243b",
            "60735a4a79d3b30173c64bf7",
            "60735a8b779f9c018f103ce9",
            "60735aabe4196e019d946b09"
        ],
        "_id": "e21e048f-45f6-4a0e-88fc-bbbbbbbb123",
        "__v": 4,
        "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc"
    },
    {
        "energyData": [],
        "climateData": [],
        "_id": "e21e048f-45f6-4a0e-88fc-bbbbbba2a3",
        "__v": 0,
        "userId": "e21e048f-45f6-4a0e-88fc-ba4dcd0e19fc"
    }
]
```

Retorna todos os registros de informação climática de geradores pertencentes ao usuário
- GET `/generator/user/:userId/climate`
```
[
    {
        "_id": "6072fd8777daae056a6ba31b",
        "generator": "e21e048f-45f6-4a0e-88fc-ba4dcd0e1f9c",
        "umidity": "40.0",
        "wind": "4.3",
        "createdAt": "2021-04-11T13:45:43.272Z",
        "updatedAt": "2021-04-11T13:45:43.272Z",
        "__v": 0
    },
    {
        "_id": "60733a714641790bbd1871b4",
        "generator": "e21e048f-45f6-4a0e-88fc-ba4dcd0e1f9c",
        "umidity": "40.0",
        "wind": "4.3",
        "createdAt": "2021-04-11T18:05:37.128Z",
        "updatedAt": "2021-04-11T18:05:37.128Z",
        "__v": 0
    },
    {
        "_id": "60733a8fba2ed90bcbd25472",
        "generator": "e21e048f-45f6-4a0e-88fc-ba4dcd0e1f9c",
        "umidity": "40.0",
        "wind": "4.3",
        "createdAt": "2021-04-11T18:06:07.411Z",
        "updatedAt": "2021-04-11T18:06:07.411Z",
        "__v": 0
    },
]
```

Retorna todos os registros de informação energética de geradores pertencentes ao usuário
- GET `/generator/user/:userId/energy`


