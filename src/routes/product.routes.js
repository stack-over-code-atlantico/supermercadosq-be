const express = require('express');
const route = express();
const ProdutoController = require('@produto/controller/ProdutoController')
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('../middlewares/isAdmin');

const productController = new ProdutoController()
/**
 * Lista todos os produtos
 */

 route.get('/:page', productController.list);

 route.get('/disapproved', productController.listDisapproved);

 route.post('/allergy/:page', productController.listPerAllergy);

 route.post('/notAllergy/:page', productController.listNotPerAllergy);

 route.get('/', productController.list);
 /**
 * Lista produto pelo id
 */
 route.get('/:id_produto', productController.listOne);

 /**
  * Cria um produto
  */
 route.post('/',authenticate,productController.create);

  /**
  * Altera um produto
  */
 route.put('/:id_produto', authenticate, productController.update);

  /**
  * Deleta um produto
  */
 route.put('/:id_produto/delete', authenticate, productController.delete)

 /**
  * Denuncia um produto
  */
 route.put('/:id_produto/denuncia', authenticate, productController.denuncia)

 /**
  * analisa Denuncia de um produto
  */
 route.put('/:id_produto/analisaDenuncia', isAdmin, productController.analisaDenuncia)

 
module.exports = route;