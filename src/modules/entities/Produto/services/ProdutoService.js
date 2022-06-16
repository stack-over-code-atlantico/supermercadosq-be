const produtoRepositorio = require('@produto/repository/produtoRepository');

class ProdutoService {
  async listAllProdutos() {
    const produtos = await produtoRepositorio.produtosRead();
    return produtos;
  }

  async createProduto(nome, ingredientes, imagem, id_usuario) {
    const produtos = await produtoRepositorio.produtosCreate(
      nome,
      ingredientes,
      imagem,
      id_usuario
    );
    return produtos;
  }

  async updateProduto(
    id_produto,
    id_usuario,
    nome,
    ingredientes,
    imagem
  ) {
    const ValidProduto = await produtoRepositorio.findUniqueProduto(id_produto);
    let produto;
    if (ValidProduto.id_usuario === id_usuario) {
      produto = await produtoRepositorio.produtosUpdate(
        id_produto,
        nome,
        ingredientes,
        imagem
      );
      return produto;
    }
    return new Error('Unauthorized Service');
  }

  async deleteProduto(id_produto, id_usuario, nivel) {
    const ValidProduto = await produtoRepositorio.findUniqueProduto(id_produto);
    let produto;
    if (ValidProduto.id_usuario === id_usuario) {
      produto = await produtoRepositorio.produtoDelete(id_produto);
      return produto;
    }
    if (nivel === 'ADMINISTRADOR') {
      produto = await produtoRepositorio.produtoDeleteAdmin(
        id_produto,
        id_usuario
      );
      return produto;
    }
    return new Error('Erroooo');
  }

  async denunciaProduto(id_produto) {
    const produto = await produtoRepositorio.denunciaProduto(id_produto);
    return produto;
  }

  async analisaDenuncia(id_produto, id_usuario, status) {
    const produto = await produtoRepositorio.analisaDenuncia(
      id_produto,
      id_usuario,
      status
    );
    return produto;
  }
}

module.exports = ProdutoService;
