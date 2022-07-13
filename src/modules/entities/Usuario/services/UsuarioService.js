const usuarioRepositorio = require('@usuario/repository/usuarioRepository');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

class UsuarioService {

  async listAllUsers() {
    const users = await usuarioRepositorio.usersRead();
    return users;
  }

  async listOne(id_usuario) {
    const user = await usuarioRepositorio.findUserPerId(id_usuario);
    return user;
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
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  ) {
    const alreadyHaveUser = await usuarioRepositorio.findUniqueUser(cpf_cnpj);
    console.log(alreadyHaveUser);

    if (alreadyHaveUser && alreadyHaveUser.email === email) throw new Error(`Email already in use.`);

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
      cep,
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
    telefone,
    restricao_alimenticia,
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
  ) {
    const users = await usuarioRepositorio.usersUpdate(
      cpf_cnpj,
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
      estado,
    );
    return users;
  }

  async deleteUser(cpf_cnpj,id_usuario, nivel) {
    const users = await usuarioRepositorio.usersDelete(cpf_cnpj,id_usuario, nivel);
    return users;
  }

  async nivelEdit(cpf_cnpj, nivel) {
    if (
      nivel === "CLIENTE" ||
      nivel === "ADMINISTRADOR" ||
      nivel === "FORNECEDOR"
    ) {
      const users = await usuarioRepositorio.nivelEdit(cpf_cnpj, nivel);
      return users;
    }
    throw new Error(`Nivel doesn't exist.`);
  }

  async passwordEdit(id_usuario, senhaAntiga, novaSenha) {
    const user = await usuarioRepositorio.findUserPerId(id_usuario)
    const comparePassword = await compare(senhaAntiga, user.senha)
    if (!comparePassword) {
      return new Error('Invalid password!');
    }
    
    try {
      const users = await usuarioRepositorio.passwordEdit(id_usuario, novaSenha);
      return users;
    } catch (error) {
      throw new Error(error);
    }
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