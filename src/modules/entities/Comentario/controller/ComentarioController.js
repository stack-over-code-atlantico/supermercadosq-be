const ComentarioService = require('@comentario/services/ComentarioService')

const comentarioService = new ComentarioService()

class ComentarioController {

  async list (req,res) {
    const comments = await comentarioService.listAllComments();
    return res.json(comments);
  }

  async create (req, res) {
    const {
      
    }
  }

}

module.exports = ComentarioController;