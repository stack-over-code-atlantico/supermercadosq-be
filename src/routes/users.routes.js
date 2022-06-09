const express = require('express');
const route = express();
const UsuarioController = require('@usuario/controller/UsuarioController');
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('@Middleware/isAdmin');

const usuarioController = new UsuarioController();

route.get('/', usuarioController.list);

route.post('/', usuarioController.create);

route.put('/:cpf_cnpj', usuarioController.update);

route.put('/:cpf_cnpj/delete', isAdmin, usuarioController.delete);

route.put('/:cpf_cnpj/nivel_edit', isAdmin, usuarioController.niveledit);

module.exports = route;
