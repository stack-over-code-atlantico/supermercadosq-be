const express = require('express');
const route = express();
const productRepository = require('../modules/entities/Produto/repository/produtoRepository');

route.get('/', async (req, res) => {
    const product = await productRepository.productRead();
    return res.json(product);
});

route.post('/', async (req, res) => {
  const {
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
  } = req.body;
  const product = await productRepository.productCreate(
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
  );
  res.status(201).json(product);
});

route.put('/:id_product', async (req, res) => {
  const { id_produto } = req.params;
  const {
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
  } = req.body;
  const product = await productRepository.productUpdate(
    Number(id_produto),
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
  );
  return res.status(204).json(product);
});

route.delete('/:id_produto', async (req, res) => {
  const { id_produto } = req.params;
  const product = await productRepository.productDelete(Number(id_produto));
  return res.status(204).send(product);
});

module.exports = route;