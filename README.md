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

- `/user_service/user`
- `/user_service/auth`
