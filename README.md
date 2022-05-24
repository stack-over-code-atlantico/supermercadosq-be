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
