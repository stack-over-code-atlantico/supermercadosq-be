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

  async deleteComment(id_comentario) {
    const validComment = await comentarioRepositorio.findUniqueComentario(id_comentario);
    let comentario;
    if (validComment.id_usuario === id_usuario) {
      comentario = await comentarioRepositorio.commentDelete(id_comentario);
      return comentario;
    }
    const comment = await comentarioRepositorio.commentDelete(
      id_comentario
    );
    return comment;
  }
  
}




module.exports = ComentarioService;