const express = require('express');
const route = express();
const comentarioRepositorio = require('@comentario/repository/comentarioRepository');
const ComentarioController = require('@comentario/controller/ComentarioController')


const comentarioController = new ComentarioController();

route.get('/', comentarioController.list);

route.post('/', comentarioController.create);

route.put('/:id_comentario', comentarioController.update);

route.put('/:id_comentario/delete', comentarioController.delete);


module.exports = route;
