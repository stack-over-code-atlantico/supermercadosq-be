const { verify } = require('jsonwebtoken')

module.exports = function (req, res, next) {
  
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  try {
    const desc = verify(token, process.env.JWT_SECRET);
    const {id_usuario, nivel} = desc
    req.id_usuario = id_usuario
    req.nivel = nivel
    next();

  } catch(e) {
    throw new Error("Invalid token!");
  }
}