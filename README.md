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

### Subindo a aplicação
Utilize os seguintes comandos para subir a aplicação

```
cp .env.sample .env

sudo docker-compose up

# Execute as migrações
sudo docker-compose exec user_service npx sequelize-cli db:migrate
```

### Rotas atuais

Os endpoints de usuário `/user_service/user` possuem autenticação, necessitando do seguinte cabeçalho:
Request Headers:
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwMjg3NTYxLWIwNmMtNGVmZS04YzdjLWRhM2RhZGJmNzA1ZiIsImVtYWlsIjoiam9hb0BlbWFpbC5jb20iLCJuYW1lIjoiYWFhYWFhYWFhYmEiLCJpc0FkbWluIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMS0wNC0xMFQxNDozNDo0Ny43OTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0xMFQxNDozNDo0Ny43OTVaIiwiaWF0IjoxNjE4MDcxMzU0LCJleHAiOjE2MjY3MTEzNTR9.vUJMqhpMtfDjCHsuslXmMaKOfHtFegCqVlAtjaX6o2g",
  "Content-Type": "application/json"
}

O token de autenticação pode ser obtido em:

- POST `/user_service/auth`
Request Body:
{
  "password": "123456",
  "email": "joao@email.com"
}

Response Body:
```
{
  "id": "25166ab6-a6c4-44f1-8ab8-979fe6fb3304",
  "email": "joao@email.com",
  "name": "aaaaaaaaaba",
  "isAdmin": false,
  "createdAt": "2021-04-10T16:23:15.410Z",
  "updatedAt": "2021-04-10T16:23:15.410Z",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1MTY2YWI2LWE2YzQtNDRmMS04YWI4LTk3OWZlNmZiMzMwNCIsImVtYWlsIjoiam9hb0BlbWFpbC5jb20iLCJuYW1lIjoiYWFhYWFhYWFhYmEiLCJpc0FkbWluIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMS0wNC0xMFQxNjoyMzoxNS40MTBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0xMFQxNjoyMzoxNS40MTBaIiwiaWF0IjoxNjE4MDc2MTg4LCJleHAiOjE2MjY3MTYxODh9.6mu9rUYjY3cPENXyfhUgQv9g2wUUl3YU8Znx1m85NdY"
}
```

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
  "createdat": "2021-04-10T17:38:23.427Z",
  "updatedat": "2021-04-10T17:38:23.427Z"
}
```
