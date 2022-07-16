const UsuarioService = require('@usuario/services/UsuarioService');

const userService = new UsuarioService();

class UsuarioController {
  async list(req, res) {
    const users = await userService.listAllUsers();
    return res.json(users);
  }

  async listOne(req, res) {
    const { id_usuario } = req.params;
    const user = await userService.listOne(Number(id_usuario));
    return res.json(user);
  }

  async create(req, res) {
    const {
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado
    } = req.body;
    const img = req.file ? req.file.location : null;
    
    const users = await userService.createUser(
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
      img,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado
    );
    return res.status(201).json(users);
  }

  async update(req, res) {
    const { cpf_cnpj } = req.params;
    const {
      nome,
      nome_social,
      email,
      senha,
      telefone,
      restricao_alimenticia,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado
    } = req.body;
    const img = req.file ? req.file.location : null;
    const users = await userService.updateUser(
      cpf_cnpj,
      nome,
      nome_social,
      email,
      senha,
      telefone,
      restricao_alimenticia,
      img,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado
    );
    return res.status(204).json(users);
  }

  async delete(req, res) {
    const { cpf_cnpj } = req.params;
    const { id_usuario, nivel } = req;
    const users = await userService.deleteUser(cpf_cnpj, id_usuario, nivel);
    if (users instanceof Error) {
      return res.status(401).json(users.message);
    }
    return res.status(204).json(users);
  }

  async niveledit(req, res) {
    const { cpf_cnpj } = req.params;
    const { nivel } = req.body;
    const users = await userService.nivelEdit(cpf_cnpj, nivel);
    return res.status(204).json(users);
  }
  async passwordEdit(req, res) {
    const { id_usuario } = req.params;
    const { senhaAntiga, novaSenha } = req.body;
    const users = await userService.passwordEdit(
      Number(id_usuario),
      senhaAntiga,
      novaSenha
    );
    if (users instanceof Error) {
      return res.status(401).json(users.message);
    }
    return res.status(204).json(users);
  }
}

module.exports = UsuarioController;
