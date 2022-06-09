
## Fluxo da Aplicação
```mermaid
    flowchart TD
    A[Chegada da requisição] -->|Envia para| B(Controller)
    B(Controller) --> C(Função correspondente no cotroller)
    C --> D{Há Erros?}
    D --> |Sim| E[Retorna Error]
    D --> |Não| F[Service]
    F --> G[Função no service]
    G --> H{Validações}
    H --> |Sim| I[Retorna Error]
    H --> |Não| J[repository]
    J --> K(Faz consulta no banco)

    style A fill:#99d9ff,stroke:#000,stroke-width:4px,color:#000
    style B fill:#acecb6,stroke:#000,stroke-width:4px,color:#000
    style D fill:#f9f49f,stroke:#000,stroke-width:4px,color:#000
    style F fill:#acecb6,stroke:#000,stroke-width:4px,color:#000
    style H fill:#f9f49f,stroke:#000,stroke-width:4px,color:#000
    style J fill:#acecb6,stroke:#000,stroke-width:4px,color:#000
```

## Fluxo para **Deletar usuário**

```mermaid
    sequenceDiagram
    par Rota "/" to Middleware
        Rota "/"->>Middleware: Envia para função nos middlewares
    and Middleware to Funcao_Auth
        Middleware->>Funcao_Auth: Tem token?
        Funcao_Auth-->>Rota "/": Não há token ou token inválido
    and Middleware to Funcao_isAdmin
        Middleware->>Funcao_isAdmin: É administrador?
        Funcao_isAdmin-->>Rota "/": Não é administrador
    and Middleware to Controller_delete_user
        Middleware->>Controller_delete_user: Deletado!
        Controller_delete_user->>Rota "/": Status 200
    end
```

##

<h1> Regra de negócios </h1>

<table>
  <tr>
    <td align="center">
      <p>Entidades</p>
    </td>
    <td align="center">
      <p>Descrição</p>
    </td>
  </tr>
   <tr>
    <td align="center">
      <p>Usuário</p>
    </td>
    <td>
      <p>
        O Usuário poderá se cadastrar como cliente ou fornecedor.
      </p>
      <p>
        O Usuário terá email, senha, cpf ou cnpj, endereço. O telefone, nome social serão opcionais.
      </p>
      <p>
        O Usuário não poderá cadastrar o cpf ou cnpj caso já estejam cadastrados.
      </p>
      <p>
        O Usuário não poderá cadastrar um email caso já esteja cadastrado.
      </p>
      <p>
        O Usuário poderá alterar email, senha, endereço, telefone, porém não o seu nível de acesso e cpf ou cnpj.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>Administrador</p>
    </td>
    <td>
      <p>
        O Administrador do sistema pode cadastrar outros administradores, fornecedores e clientes.
      </p>
      <p>
        O Administrador poderá adicionar suas próprias postagens, comentários, assim como apagar e editar.
      </p>
      <p>
        O Administrador poderá bloquear usuários, arquivar comentários e postagens denunciados.
      </p>
      <p>
        O Administrador poderá alterar o nível de <strong>qualquer</strong> usuário.
      </p>
      <p>
        O sistema deverá iniciar com um Administrador primordial (Adão).
      </p>
      <p>
        Haverá uma validação para que o Administrador (Adão) não possa ser deletado do sistema através do seu ID.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>Fornecedor</p>
    </td>
    <td>
      <p>
        O Fornecedor poderá criar suas próprias postagens e comentar outras.
      </p>
      <p>
        O Fornecedor poderá denunciar comentários e postagens.
      </p>
      <p>
        O Fornecedor poderá editar suas postagens e comentários.
      </p>
      <p>
        O Fornecedor que tiver sua conta desativada, terá o atributo "ativo" como false, assim como seus comentários e produtos postados.
      </p>
    </td>
  </tr>
    <tr>
    <td align="center">
      <p>Cliente</p>
    </td>
    <td>
      <p>
        O Cliente poderá criar suas próprias postagens e comentar outras.
      </p>
      <p>
        O Cliente poderá denunciar comentários e postagens.
      </p>
      <p>
        O Cliente poderá editar suas postagens e comentários.
      </p>
      <p>
        O Cliente que tiver sua conta desativada, terá o atributo "ativo" como false, assim como seus comentários e produtos postados.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>Produtos</p>
    </td>
    <td>
      <p>
        O Produto deverá ter um nome, ingredientes. A imagem é opcional.
      </p>
      <p>
        O Produto iniciará com o atributo "status" como null, caberá ao Administrador avalia-lo entre "true" ou "false".
      </p>
      <p>
        O Produto, ao ser postado pelo usuário, terá uma data de postagem como atributo, e também, o atributo "editado" para mostrar caso haja alteração na postagem.
      </p>
      <p>
        O Produto só poderá ser listado e apresentado no site caso possua o atributo "status" como null ou true.
      </p>
      <p>
        O Produto só poderá denunciado caso seu atributo "status" seja null.
      </p>
      <p>
        O Produto receberá inicialmente o atributo "feedbacks_produto" como 0, e caso receba like terá seu valor incrementado.
      </p>
      <p>
        O Produto possuirá um atributo chamado "id_aprovado" recebendo o valor do ID do Administrador responsável por aprova-lo.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>Comentário</p>
    </td>
    <td>
      <p>
        O Comentário deverá possuir uma mensagem.
      </p>
      <p>
        O Comentário ao ser feito, terá os atributos "status", "data_comentario", "editado" e "id_aprovado".
      </p>
      <p>
        O Comentário iniciará com o atributo "status" como null, caberá ao Administrador avalia-lo entre "true" ou "false".
      </p>
      <p>
        O Comentário iniciará com o atributo "editado" como false, se tornando true ao ser editado pela primeira vez.
      </p>
      <p>
        O Comentário não possuirá número mínimo de caracteres, porém deverá possuir 140 caracteres no máximo.
      </p>
      <p>
        O Comentário terá o atributo "feedbacks_comentarios" iniciado como 0, e se caso receber like terá seu valor incrementado.
      </p>
      <p>
        O Comentário possuirá um atributo chamado "id_aprovado" recebendo o valor do ID do Administrador responsável por aprova-lo.
      </p>
    </td>
  </tr>
</table>

## Ações a Fazer

- **O sistema deverá iniciar com um Administrador primordial (Adão).**
- **Haverá uma validação para que o Administrador (Adão) não possa ser deletado do sistema através do seu ID.**

### Usuário
- [ok] : Cadastrar usuário
- [ok] : Listagem de usuário
- [ok] : Atualização de usuário
- [ok] : O Usuário não poderá cadastrar o cpf ou cnpj caso já estejam cadastrados.
- [ok] : O Usuário não poderá cadastrar um email caso já esteja cadastrado.
- [ok] : O Usuário poderá alterar email, senha, endereço, telefone, porém não o seu nível de acesso e cpf ou cnpj não.
- [--] : O Usuário poderá adicionar suas próprias postagens, comentários
- [--] : O Usuário poderá denunciar comentários e postagens.
- [--] : O Usuário poderá editar suas postagens e comentários.

### Administrador
- **Todos tem um middleware isAdmin**
- [ok] : O Administrador do sistema pode transformar um usuário em ADMIN. **Criar rota, terá uma validação de administrador, ou seja Middleware isAdmin**
- [--] : O Administrador poderá adicionar apagar e editar.        
- [--] : O Administrador poderá arquivar comentários  
- [--] : O Administrador poderá bloquear postagens denunciados.
- [ok] : Deixar usuário inativo (Delete)
- [ok] : O Administrador poderá alterar o nível de qualquer usuário.
- [--] : Aprovar produto **Quando o prdiduto estive aprovado, terá o id_aprovado, que será o id do administrador que aprovou**
### Fornecedor
- [--] : Poderá denunciar comentários e postagens.
- [--] : Poderá editar suas postagens e comentários.

### Cliente
- [ok] : O Cliente que tiver sua conta desativada, terá o atributo "ativo" como false, assim como seus comentários e produtos postados.

### Produtos
- [ok] : Criar produto
- [ok] : Listar produto apenas aqueles com status **diferentes de false**
- [--] : Atualizar produto
- [--] : Deletar/Denunciar produto **Setar Status para false**    **Terá validação, ou seja, Middleware isAdmin**
- [--] : Função rota para incrementar "feedbacks_produto" inicia com 0.

### Comentário
- [--] : Criar comentário
- [--] : Deletar comentário **Setar status para false**
- [--] : Atualizar comentário
- [--] : Listar comentário
- [--] : Denunciar comentário **Setar para false**
- [--] : Função rota para atualizar id_aprovado com o id do **ADMIN** quando aprovado **Apenas Admins podem aprovar** 
- [--] : Função rota para incrementar "feedbacks_produto" inicia com 0.

