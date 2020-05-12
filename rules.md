## Cell
**Model**

  > id -> Primary key, auto increment
  > code -> integer, unique
  > name -> string

**Controller**

  > index() -> Listar todas as células
  >> store() -> Grava novas células (Disponível apenas para usuários com permissão.)
  > update() -> Altera os dados (Disponível apenas para usuários com permissão.)
  > delete() -> Permite a exclusão de células (Disponível apenas para usuários com permissão.)

  Para os métodos update e delete, recebe o código (ou id) da célula via route e faz alterações.

## Profile
**Model**

  > id -> Primary key, auto increment
  > code -> integer, unique
  > name -> string
  > description -> string

**Controller**

  > index() -> Lista todos os perfis
  >> store() -> Grava novos perfis (Disponível apenas para usuários com permissão.)
  > update() -> Altera os dados (Disponível apenas para usuários com permissão.)
  > delete() -> Permite a exclusão de perfis (Disponível apenas para usuários com permissão.)

  A lógica do tipo de perfil, a principio, será inclusa em outra área.
  Para os métodos update e delete, recebe o código (ou id) do perfil via route e faz alterações.


## User
**Model**

  > id -> Primary key, auto increment
  > code -> integer, unique
  > name -> string
  > email -> string
  > password -> string

  >> id_profile -> FK, integer
  >> id_cell -> FK, integer

**Controller**

  > index() -> Lista todos os usuários
  > store() -> Grava um usuário (Disponível apenas para usuários com permissão.)
  > update() -> ALtera um usuário (Disponível apenas para usuários com permissão.)
  > delete() -> Remove um usuário (Disponível apenas para usuários com permissão.)

## Management
**Model**
  > id -> Primary key, auto increment
  > code -> integer, unique,
  > name -> string

**Controller**
  > store() -> Grava uma diretoria

## Area
**Model**
  > id -> Primary key, auto increment
  > code -> integer, unique
  > name -> string

  >> id_management -> FK, integer

**Controller**
  > store() -> Grava uma área
  > index() -> retorna todas as áreas

## Type
**Model**
  > id -> Primary key, auto increment
  > name -> string, unique

**Controller**


## Category
**Model**
  > id -> Primary key, auto increment
  > name -> string, unique

**Controller**


## Status
**Model**
  > id -> Primary key, integer
  > name -> string, unique

**Controller**


## Priority
**Model**
  > id -> Primary key, auto increment
  > code -> integer
  > name -> string

**Controller**
  > index() -> Lista todos as prioridades
  > store() -> Grava uma nova prioridade (Disponível apenas para usuários com permissão.)
  > update() -> Altera uma prioridade (Disponível apenas para usuários com permissão.)
  > delete() -> Remove uma prioridade (Disponível apenas para usuários com permissão.)

  Para os métodos update e delete, recebe o código (ou id) da prioridade via route e faz alterações.


## Project
**JSON**
  > code -> string
  > title -> string
  > decription -> string
  > cell_id (id) -> integer
  > area_id (id) -> integer
  > type (id) -> integer
  > category (id) -> integer
  > status (id) -> integer

**Model**

  > id -> Primary key, auto increment
  > code -> string, unique
  > title -> string
  > description -> string
  > initial_date -> date
  > final_date -> date

  >> id_priority -> FK, integer

**Controller**
  > index() -> Lista todos os projetos
  > store() -> Grava um novo projeto (Disponível apenas para usuários com permissão.)
  > update() -> Altera um projeto
  > delete() -> Remove um projeto (Disponível apenas para usuários com permissão.)

  initial_date pode ser informado manualmente ou setado de acordo com o momento de criação.
  final_date pode ser gravado com um botão de fechamento.

## Solicitation
**Model**
  > id -> Primary key, auto increment
  > code -> integer, unique
  > title -> string
  > description -> string
  > author -> string

  >> id_user -> FK, integer
  >> id_project -> FK, integer

**Controller**
  > index() -> Lista todos as solicitações
  > store() -> Grava uma nova solicitação (Disponível apenas para usuários com permissão.)
  > update() -> Altera uma solicitação (Disponível apenas para usuários com permissão.)
  > delete() -> Remove uma solicitação (Disponível apenas para usuários com permissão.)

  para alterações e deleções, deve ser informado o código.


=================================

## Controllers

O middleware de autenticação só será responsável por verificar se o token é valido. As permissões sequentes serão estabelecidas em cada controller ou será criado um middleware que verificará, em rotas necessárias, o id_profile.

**SessionController**
  > Gera um token JWT que expira em 1 dia e recebe como payload o id e o id_profile do usuário. Com essas informações é possível construir uma lógica de permissões.

**ActivityController**
  > index() -> Mostra os projetos que o usuário é responsável e lista as classificações
    -> Busca na tabela de solicitações as tuplas onde ele é o usuário responsável.
    -> Recupera destas tuplas o id_project. (É um array).
    -> Vai até a tabela de projetos e recupera o código e o título dos projetos.

    -> Busca na tabela de classificação todas as opções possíveis. (Pode ser implementado no front)

    Isso vai servir para mostrar ao usuário as opções no campo projeto (ou atividade).


  > store() -> utiliza das informações recebidas do formulário para armazenar na tabela de atividades.
  -> O campo date verifica se a hora deve ser colocada automaticamente ou de modo manual. Para isso, pode-se criar um campo virtual no Model de atividades para verificar se o campo veio preenchido ou não. Caso o valor seja false, então o horário é o horário de fim da atividade anterior. Se o valor for diferente de false, então o horário será o dado fornecido.

  > update() -> Ficará disponível em outra view, onde será mostrado todas as atividades referente a um período de tempo escolhido pelo usuário.

  > delete() -> Poderá ser deletado a partir da mesma view onde será listado todas as atividades realizadas.



##### CORREÇÕES #####
  **Cell :** Adicionar uma célula passando um array vazio, a célula é gravada na tabela e não tem relacionamentos. Seria interessante retornar no JSON todas as áreas com as quais se relaciona.

  **User :** O cadastro de usuário deve verificar o email ou o código?
             Retornar a célula e o perfil do usuário.

  **TODOS :** Verificar todos os campos e nomes de tabelas ao realizar as migrations.










