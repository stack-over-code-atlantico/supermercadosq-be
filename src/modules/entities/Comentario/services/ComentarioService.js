const comentarioRepositorio = require('@comentario/repository/comentarioRepository');

class ComentarioService{
  async listAllComentarios(){
    const comentarios = await comentarioRepositorio.comentariosRead()
    return comentarios
  }
}

module.exports = ComentarioService