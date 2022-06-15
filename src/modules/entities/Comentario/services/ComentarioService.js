const comentarioRepositorio = require('@comentario/repository/comentarioRepository');

class ComentarioService {

  async listAllComments() {
    const comments = await comentarioRepositorio.commentRead();
    return comments;
  }
}

module.exports = ComentarioService;