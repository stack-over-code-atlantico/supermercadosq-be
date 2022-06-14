const express = require('express');
const route = express();
const comentarioRepositorio = require('@comentario/repository/comentarioRepository');
const ComentarioController = require('@comentario/controller/ComentarioController')


const comentarioController = new ComentarioController()

route.get('/', comentarioController.list)

route.post('/', async (req, res) => {
  const {
    mensagem,
    id_produto,
    id_usuario,
    id_aprovado
  } = req.body;
  const comentario = await comentarioRepositorio.comentarioCreate(
    mensagem,
    id_produto,
    id_usuario,
    id_aprovado
  );
  res.status(201).json(comentario);
});

route.put('/:id_comentario', async (req, res) => {
  const { id_comentario } = req.params;
  const {
    mensagem,
    id_produto,
    id_usuario,
    id_aprovado
  } = req.body;
  const comentario = await comentarioRepositorio.comentarioUpdate(
    Number(id_comentario),
    mensagem,
    id_produto,
    id_usuario,
    id_aprovado
  );
  return res.status(204).json(comentario);
});

route.delete('/:id_comentario', async (req, res) => {
  const { id_comentario } = req.params;
  const comentario = await comentarioRepositorio.comentarioDelete(Number(id_comentario));
  return res.status(204).send(comentario);
});

module.exports = route;
