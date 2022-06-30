const express = require('express');
const route = express();
const comentarioRepositorio = require('@comentario/repository/comentarioRepository');
const ComentarioController = require('@comentario/controller/ComentarioController')
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('../middlewares/isAdmin');


const comentarioController = new ComentarioController();

route.get('/', comentarioController.list);

route.get('/:id_comentario', comentarioController.listOne);

route.post('/', authenticate,comentarioController.create);

route.put('/:id_comentario', authenticate, comentarioController.update);

route.put('/:id_comentario/delete', authenticate, comentarioController.delete);

// denuncia um comentario
route.put('/:id_comentario/report', authenticate, comentarioController.report);

// analisa denuncia de um comentario
route.put('/:id_comentario/reviewReport', isAdmin, comentarioController.reviewReport);

module.exports = route;
