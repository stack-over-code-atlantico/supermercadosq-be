const express = require('express');
const route = express();
const enderecoRepositorio = require('@endereco/repository/enderecoRepository');

route.get('/', async (req, res) => {
    const address = await enderecoRepositorio.addressRead();
    return res.json(address);
});

route.post('/', async (req, res) => {
  const {
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    id_usuario,
  } = req.body;
  const address = await enderecoRepositorio.addressCreate(
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    id_usuario,
  );
  res.status(201).json(address);
});

route.put('/:id_endereco', async (req, res) => {
  const { id_endereco } = req.params;
  const {
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    id_usuario,
  } = req.body;
  const address = await enderecoRepositorio.addressUpdate(
    Number(id_endereco),
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    id_usuario,
  );
  return res.status(204).json(address);
});

route.delete('/:id_endereco', async (req, res) => {
  const { id_endereco } = req.params;
  const address = await enderecoRepositorio.addressDelete(Number(id_endereco));
  return res.status(204).send(address);
});

module.exports = route;
