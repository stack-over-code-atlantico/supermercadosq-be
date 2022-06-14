const ProdutoService = require('@produto/services/ProdutoService');

const produtoService = new ProdutoService();

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
    const {id_produto} = req.params;
    const { nome, ingredientes, imagem } = req.body;
    const produto = await produtoService.updateProduto(
      Number(id_produto),
      nome,
      ingredientes,
      imagem
    );
    return res.status(204).json(produto);
  }

  async delete(req, res){
    const {id_produto} = req.params
    const produto = await produtoService.deleteProduto(Number(id_produto))
    return res.status(204).json(produto)
  }
}

module.exports = ProdutoController;
