const comentarioRepositorio = require('@comentario/repository/comentarioRepository');

class ComentarioService {

  async listAllComments() {
    const comments = await comentarioRepositorio.readComment();
    return comments;
  }

  async createComment(mensagem, id_produto, id_usuario) {
    const comments = await comentarioRepositorio.createComment(
      mensagem,
      id_produto,
      id_usuario,
    );
    return comments;
  }

  async updateComment(id_comentario, mensagem) {
    const comment = await comentarioRepositorio.updateComment(
      id_comentario,
      mensagem
    );
    return comment;
  }

  async deleteComment(id_comentario, id_usuario, nivel) {
    const ValidComment = await comentarioRepositorio.findUniqueComment(id_comentario);
    
    if (ValidComment.id_usuario === id_usuario) {
      let comment = await comentarioRepositorio.deleteComment(id_comentario);
      return comment;
    }
    if (nivel === 'ADMINISTRADOR') {
      let comment = await comentarioRepositorio.deleteAdminComment(
        id_comentario,
        id_usuario
      );
      return comment;
    }
    return new Error('Error');
  }

  async reportComment(id_comentario) {
    const comment = await comentarioRepositorio.reportComment(id_comentario);
    return comment;
  }

  async reviewReportComment(id_comentario, id_usuario, status) {
    const comment = await comentarioRepositorio.reviewReportComment(id_comentario, id_usuario, status);
    return comment;
  }
}




module.exports = ComentarioService;