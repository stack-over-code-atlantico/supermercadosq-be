const usuarioRepositorio = require('@usuario/repository/usuarioRepository');
const { sign } = require('jsonwebtoken');

class UsuarioService {

  async listAllUsers() {
    const users = await usuarioRepositorio.usersRead();
    return users;
  }

  async createUser(
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
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    );
    return users;
  }

  async updateUser(
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

  async deleteUser(
    cpf_cnpj,
    nome,
    nome_social,
    email,
    senha,
    ativo,
    nivel,
    telefone,
    restricao_alimenticia
  ) {
    const users = await usuarioRepositorio.usersDelete(
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
    return users;
  }

  async verifyAdmin(cpf_cnpj){
    console.log('verifyAdmin')
    var user = await usuarioRepositorio.findUniqueUser(cpf_cnpj);
    if (!user) throw new Error("User not found!");
    if (user.nivel === "ADMINISTRADOR") return true;
    return false;
  }
}

module.exports = UsuarioService;