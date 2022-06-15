const ProdutoService = require('@produto/services/ProdutoService');
const { verify } = require('jsonwebtoken');

const produtoService = new ProdutoService();

function getToken(authHeader) {
  if (!authHeader) {
    throw new Error('Token missing!');
  }
  const [, token] = authHeader.split(' ');
  const { id_usuario, nivel } = verify(token, process.env.JWT_SECRET);
  return [id_usuario, nivel];
}
class ProdutoController {
  async list(req, res) {
    const produtos = await produtoService.listAllProdutos();
    return res.json(produtos);
  }

  async create(req, res) {
    const { nome, ingredientes, imagem, id_usuario } = req.body;
    const produto = await produtoService.createProduto(
      nome,
      ingredientes,
      imagem,
      id_usuario
    );
    return res.status(201).json(produto);
  }

  async update(req, res) {
    const { id_produto } = req.params;
    const { nome, ingredientes, imagem } = req.body;
    const produto = await produtoService.updateProduto(
      Number(id_produto),
      nome,
      ingredientes,
      imagem
    );
    return res.status(204).json(produto);
  }

  async delete(req, res) {
    const authHeader = req.headers.authorization;
    const [id_usuario, nivel] = getToken(authHeader);
    const { id_produto } = req.params;
    const produto = await produtoService.deleteProduto(
      Number(id_produto),
      id_usuario,
      nivel
    );
    console.log(produto);
    if (produto instanceof Error) {
      return res.status(401).json(produto.message);
    }
    return res.status(204).json(produto);
  }

  async denuncia(req, res) {
    const { id_produto } = req.params;
    const produto = await produtoService.denunciaProduto(Number(id_produto));

    return res.status(204).json(produto);
  }

  async analisaDenuncia(req, res) {
    const authHeader = req.headers.authorization;
    const [id_usuario] = getToken(authHeader);
    const { id_produto } = req.params;
    const {status} = req.body;
    const produto = await produtoService.analisaDenuncia(
      Number(id_produto),
      id_usuario,
      status
    );
    return res.status(204).json(produto);
  }
}

module.exports = ProdutoController;
