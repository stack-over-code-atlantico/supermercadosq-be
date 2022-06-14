const usuarioRepository = require('@usuario/repository/usuarioRepository');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

class LoginService {
  async signin(email, senha) {
    const user = await usuarioRepository.findUserPerEmail(email);
    var token = null;
    if (!user) {
      throw new Error('Invalid login!');
    }
    console.log(user);

    try {
      const comparePassword = await compare(senha, user.senha);
      console.log(comparePassword);
      if (comparePassword) {
        token = sign(
          {
            cpf_cnpj: user.cpf_cnpj,
            nivel: user.nivel,
            id_usuario: user.id_usuario
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
      }
    } catch (error) {
      throw new Error(error);
    }

    return token;
  }
}

module.exports = LoginService;
