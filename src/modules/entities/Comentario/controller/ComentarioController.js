const ComentarioService = require('@comentario/services/ComentarioService')

const comentarioService = new ComentarioService();

class ComentarioController {

  async list (req,res) {
    const comments = await comentarioService.listAllComments();
    return res.json(comments);
  }

  async create (req, res) {
    const { mensagem, id_produto, id_usuario } = req.body;
    const comment = await comentarioService.createComment(
      mensagem,
      id_produto,
      id_usuario,
    );
    return res.status(201).json(comment);
  }

  async update (req, res) {
    const { id_comentario } = req.params;
    const { mensagem } = req.body;
    const comment = await comentarioService.updateComment(
      Number(id_comentario),
      mensagem
    );
    return res.status(204).json(comment);
  }
  
 


}

module.exports = ComentarioController;