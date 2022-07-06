const ProdutoService = require('@produto/services/ProdutoService');

const produtoService = new ProdutoService();

class ProdutoController {
  async list(req, res) {
    const { page } = req.params;
    const produtos = await produtoService.listAllProdutos(Number(page));
    return res.json(produtos);
  }
  
  async listDisapproved(req, res) {
    const produtos = await produtoService.listDisapprovedProdutos();
    return res.json(produtos);
  }
  
  async listPerAllergy(req, res) {
    const { page } = req.params;
    const { alergia } = req.body;
    const produtos = await produtoService.listAllPerAllergy(Number(page), alergia);
    return res.json(produtos);
  }

  async listNotPerAllergy(req, res) {
    const { page } = req.params;
    const { alergia } = req.body;
    const produtos = await produtoService.listAllNotPerAllergy(Number(page), alergia);
    return res.json(produtos);
  }

  async listOne(req, res) {
    const { id_produto } = req.params;
    const produtos = await produtoService.listOne(Number(id_produto));
    return res.json(produtos);
  }

  async create(req, res) {
    const { id_usuario } = req;
    const { nome, alergia, ingredientes, descricao } = req.body;
    const produto = await produtoService.createProduto(
      nome,
      alergia,
      ingredientes,
      req.file.location,
      descricao,
      id_usuario
    );
    return res.status(201).json(produto);
  }

  async update(req, res) {
    const { id_usuario } = req;
    const { id_produto } = req.params;
    const { nome, alergia, ingredientes, descricao } = req.body;
    const produto = await produtoService.updateProduto(
      Number(id_produto),
      id_usuario,
      nome,
      alergia,
      ingredientes,
      req.file.location,
      descricao
    );
    if (produto instanceof Error) {
      return res.status(401).json(produto.message);
    }
    return res.status(204).json(produto);
  }

  async delete(req, res) {
    const { id_usuario, nivel } = req;
    const { id_produto } = req.params;
    const produto = await produtoService.deleteProduto(
      Number(id_produto),
      id_usuario,
      nivel
    );
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
    const { id_usuario } = req;
    const { id_produto } = req.params;
    const { status } = req.body;
    const produto = await produtoService.analisaDenuncia(
      Number(id_produto),
      id_usuario,
      status
    );
    return res.status(204).json(produto);
  }
}

module.exports = ProdutoController;
