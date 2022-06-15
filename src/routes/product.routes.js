const express = require('express');
const route = express();
const ProdutoController = require('@produto/controller/ProdutoController')
const authenticate = require('@Middleware/authenticate');
const isAdmin = require('../middlewares/isAdmin');

const productController = new ProdutoController()
/**
 * Lista todos os produtos
 */
 route.get('/', productController.list);

 /**
  * Cria um produto
  */
 route.post('/', productController.create);

  /**
  * Altera um produto
  */
 route.put('/:id_produto', productController.update);

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