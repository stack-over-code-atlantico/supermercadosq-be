const UsuarioService = require('@usuario/services/UsuarioService')
const { verify } = require('jsonwebtoken')

const usuarioService = new UsuarioService();

module.exports = function (req, res, next) {
  console.log('IsAdmin')
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  const { cpf_cnpj } = verify(token, process.env.JWT_SECRET);
  const user = usuarioService.verifyAdmin(cpf_cnpj)
  console.log(user)

  if(!user){
    throw new Error("User isn't admin!")
  }

  return next();
}