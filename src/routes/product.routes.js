const express = require('express');
const route = express();
const ProdutoController = require('@produto/controller/ProdutoController')
const authenticate = require('@Middleware/authenticate');

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
 route.put('/:id_produto/delete', productController.delete)

 
module.exports = route;