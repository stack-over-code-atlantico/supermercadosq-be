const ComentarioService = require('@comentario/services/ComentarioService')

const comentarioService = new ComentarioService();

class ComentarioController {

  async list (req,res) {
    const comments = await comentarioService.listAllComments();
    return res.json(comments);
  }

  async listHistoric(req, res) {
    const { id_usuario } = req.params;
    const comentarios = await comentarioService.listHistoric(Number(id_usuario));
    return res.json(comentarios);
  }

  async listDisapproved (req,res) {
    const comments = await comentarioService.listDisapprovedComments(); 
    return res.json(comments);
  }
  async listByProduct (req,res) {
    const {id_produto} = req.params
    const comments = await comentarioService.listByProduct(Number(id_produto));
    return res.json(comments);
  }
  async listOne (req,res) {
    const { id_comentario } = req.params;
    const comments = await comentarioService.listOne(Number(id_comentario));
    return res.json(comments);
  }

  async create (req, res) {
    const {id_usuario} = req
    const { mensagem, id_produto} = req.body;
    const comment = await comentarioService.createComment(
      mensagem,
      Number(id_produto),
      id_usuario,
    );
    return res.status(201).json(comment);
  }

  async update (req, res) {
    const {id_usuario} = req
    const { id_comentario } = req.params;
    const { mensagem } = req.body;
    const comment = await comentarioService.updateComment(
      Number(id_comentario),
      id_usuario,
      mensagem,
    );
    if (comment instanceof Error) {
      return res.status(401).json(comment.message);
    }
    return res.status(204).json(comment);
  }
  
 async delete (req, res) {
  const { id_usuario, nivel } = req
  const { id_comentario } = req.params;
  const comment = await comentarioService.deleteComment(
    Number(id_comentario),
    id_usuario,
    nivel
  );
  if (comment instanceof Error) {
    return res.status(401).json(comment.message);
  }
  return res.status(204).json(comment);
}

  async report (req, res) {
    const { id_comentario } = req.params;
    const comment = await comentarioService.reportComment(Number(id_comentario));
    return res.status(204).json(comment);
  }

  async reviewReport (req, res) {
    const { id_usuario } = req;
    const { id_comentario } = req.params;
    const { status } = req.body;
    const comment = await comentarioService.reviewReportComment(
      Number(id_comentario),
      id_usuario,
      status
    );
    return res.status(204).json(comment);
  }

}

module.exports = ComentarioController;