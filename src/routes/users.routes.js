const express = require('express');
const route = express();
const UsuarioController = require('@usuario/controller/UsuarioController');
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('@Middleware/isAdmin');
const multer = require('multer');
const {uploadToS3} = require('../utils/uploadImage');

const usuarioController = new UsuarioController();
/**
 * Lista todos os usuários
 */
route.get('/', usuarioController.list);
/**
 * Lista um usuário pelo Id
 */ 
route.get('/:id_usuario', usuarioController.listOne);
/**
 * Cria um usuário
 */
route.post('/', multer(uploadToS3('profiles')).single('file'), usuarioController.create);

route.put('/:cpf_cnpj', multer(uploadToS3('profiles')).single('file'), usuarioController.update);
/**
 * Torna usuário inativo
 * altera ativo pra false
 */
route.put('/:cpf_cnpj/delete', authenticate, usuarioController.delete);
/**
 * Altera nível acesso do usuário
 */
route.put('/:cpf_cnpj/nivel_edit', isAdmin, usuarioController.niveledit);
/**
 * Altera nível acesso do usuário
 */
route.put('/:id_usuario/changePassword', authenticate, usuarioController.passwordEdit);

module.exports = route;
