const express = require('express');
const route = express();
const UsuarioController = require('@usuario/controller/UsuarioController');
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('@Middleware/isAdmin');

const usuarioController = new UsuarioController();

route.get('/', isAdmin, usuarioController.list);

route.post('/', usuarioController.create);

route.put('/:cpf_cnpj', usuarioController.update);

route.put('/:cpf_cnpj/delete', usuarioController.delete);

module.exports = route;
