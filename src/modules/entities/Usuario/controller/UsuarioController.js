const UsuarioService = require('@usuario/services/UsuarioService');

const userService = new UsuarioService();

class UsuarioController {
  
  async list (req, res) {
    const users = await userService.listAllUsers();
    return res.json(users);
  }

  async create (req, res) {
    const {
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    } = req.body;
    const users = await userService.createUser(
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    );
    return res.status(201).json(users);
  }

  async update (req, res) {
    const { cpf_cnpj } = req.params;
    const {
      nome,
      nome_social,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
    } = req.body;
    const users = await userService.updateUser(
      cpf_cnpj,
      nome,
      nome_social,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
    );
    return res.status(204).json(users);
  }
  
  async delete (req, res) {
    const { cpf_cnpj } = req.params;
    const {
      nome,
      nome_social,
      email,
      senha,
      ativo,
      nivel,
      telefone,
      restricao_alimenticia,
    } = req.body;
    const users = await userService.deleteUser(
      cpf_cnpj,
      nome,
      nome_social,
      email,
      senha,
      ativo,
      nivel,
      telefone,
      restricao_alimenticia,
    );
    return res.status(204).json(users);
  }
}

module.exports = UsuarioController;