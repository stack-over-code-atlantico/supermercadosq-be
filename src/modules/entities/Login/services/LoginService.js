const usuarioRepository = require('@usuario/repository/usuarioRepository');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

class LoginService {
  async signIn (email, senha) {
    const user = await usuarioRepository.findUserPerEmail(email);
    const comparePassword = await compare(senha, user.senha);
    console.log(comparePassword);
    return user;
  }
}

module.exports = LoginService;