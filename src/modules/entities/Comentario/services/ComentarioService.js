const comentarioRepositorio = require('@comentario/repository/comentarioRepository');

class ComentarioService {

  async listAllComments() {
    const comments = await comentarioRepositorio.commentRead();
    return comments;
  }

  async createComment(mensagem, id_produto, id_usuario) {
    const comments = await comentarioRepositorio.commentCreate(
      mensagem,
      id_produto,
      id_usuario,
    );
    return comments;
  }

  async updateComment(id_comentario, mensagem) {
    const comment = await comentarioRepositorio.commentUpdate(
      id_comentario,
      mensagem
    );
    return comment;
  }
  
}




module.exports = ComentarioService;