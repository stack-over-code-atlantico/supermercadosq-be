const express = require('express');
const route = express();
const UsuarioController = require('@usuario/controller/UsuarioController');
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('@Middleware/isAdmin');

const usuarioController = new UsuarioController();
/**
 * Lista todos os usuários
 */
route.get('/', usuarioController.list);
/**
 * Cria um usuário
 */
route.post('/', usuarioController.create);

route.put('/:cpf_cnpj', usuarioController.update);
/**
 * Torna usuário inativo
 * altera ativo pra false
 */
route.put('/:cpf_cnpj/delete', isAdmin, usuarioController.delete);
/**
 * Altera núvel acesso do usuário
 */
route.put('/:cpf_cnpj/nivel_edit', isAdmin, usuarioController.niveledit);

module.exports = route;
