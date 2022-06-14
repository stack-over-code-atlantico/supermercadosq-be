const ComentarioService = require('@comentario/services/ComentarioService')

const comentarioService = new ComentarioService()

class ComentarioController{
  async list(req,res){
    const comentarios = await comentarioService.listAllComentarios()
    return res.json(comentarios)
  }
}

module.exports = ComentarioController;