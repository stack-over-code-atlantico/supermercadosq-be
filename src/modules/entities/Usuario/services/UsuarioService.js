const usuarioRepositorio = require('@usuario/repository/usuarioRepository');
const { sign } = require('jsonwebtoken');

class UsuarioService {
  async listAllUsers () {
    const users = await usuarioRepositorio.usersRead();
    return users;
  }

  async createUser (
    nome,
    nome_social,
    cpf_cnpj,
    email,
    senha,
    nivel,
    telefone,
    restricao_alimenticia
  ) {
    const alreadyHaveUser = await usuarioRepositorio.findUniqueUser(cpf_cnpj);
    
    if (alreadyHaveUser) throw new Error(`Already have user.`);
    
    const users = await usuarioRepositorio.usersCreate(
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
    );
    return users;
  }

  async updateUser (
    cpf_cnpj,
    nome,
    nome_social,
    email,
    senha,
    nivel,
    telefone,
    restricao_alimenticia
  ) {
    const users = await usuarioRepositorio.usersUpdate(
      cpf_cnpj,
      nome,
      nome_social,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
    );
    return users;
  }
  
  async deleteUser (cpf_cnpj) {
    const users = await usuarioRepositorio.usersDelete(cpf_cnpj);
    return users;
  }
}

module.exports = UsuarioService;