const express = require('express');
const route = express();
const comentarioRepositorio = require('@comentario/repository/comentarioRepository');
const ComentarioController = require('@comentario/controller/ComentarioController')


const comentarioController = new ComentarioController();

route.get('/', comentarioController.list);

route.post('/', comentarioController.create);

route.put('/:id_comentario', comentarioController.update);


route.delete('/:id_comentario', async (req, res) => {
  const { id_comentario } = req.params;
  const comentario = await comentarioRepositorio.comentarioDelete(Number(id_comentario));
  return res.status(204).send(comentario);
});

module.exports = route;
