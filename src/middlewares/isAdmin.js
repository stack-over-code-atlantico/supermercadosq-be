const UsuarioService = require('@usuario/services/UsuarioService');
const { verify } = require('jsonwebtoken');

const usuarioService = new UsuarioService();

module.exports = async function (req, res, next) {
  console.log('IsAdmin');
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing!');
  }
  const [, token] = authHeader.split(' ');
  const { cpf_cnpj } = verify(token, process.env.JWT_SECRET);
  const desc = verify(token, process.env.JWT_SECRET);
  const { id_usuario, nivel } = desc;
  req.id_usuario = id_usuario;
  req.nivel = nivel;
  const user = await usuarioService.verifyAdmin(cpf_cnpj);

  if (!user) {
    throw new Error("User isn't admin!");
  }

  return next();
};
