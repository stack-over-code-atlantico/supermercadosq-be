const usuarioRepository = require('@usuario/repository/usuarioRepository');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

class LoginService {
  async signin(email, senha) {
    const user = await usuarioRepository.findUserPerEmail(email);
    if (!user) {
      return new Error('Invalid login!');
    }
    const comparePassword = await compare(senha, user.senha);
    if (!comparePassword) {
      return new Error('Invalid password!');
    }
    if (user.ativo === false) {
      return new Error('Account Disabled!');
    }
    var token = null;
    console.log(user);

    try {
      console.log(comparePassword);
      if (comparePassword) {
        token = sign(
          {
            cpf_cnpj: user.cpf_cnpj,
            nivel: user.nivel,
            id_usuario: user.id_usuario,
            email: user.email,
            nome: user.nome
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
