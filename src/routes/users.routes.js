const express = require('express');
const route = express();
const UsuarioController = require('@usuario/controller/UsuarioController');

const usuarioController = new UsuarioController();

route.get('/', usuarioController.list);

route.post('/', usuarioController.create);

route.put('/:cpf_cnpj', usuarioController.update);

route.delete('/:cpf_cnpj', usuarioController.delete);

module.exports = route;
