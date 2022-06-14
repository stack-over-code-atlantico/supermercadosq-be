const produtoRepositorio = require('@produto/repository/produtoRepository');

class ProdutoService {
  async listAllProdutos() {
    const produtos = await produtoRepositorio.produtosRead();
    return produtos;
  }

  async createProduto(
    nome,
    ingredientes,
    imagem,
    id_usuario,
   
  ) {
    const produtos = await produtoRepositorio.produtosCreate(
      nome,
      ingredientes,
      imagem,
      id_usuario,
    );
    return produtos;
  }

  async updateProduto(
    nome,
    ingredientes,
    imagem,
  ){
    const produtos = await produtoRepositorio.produtosUpdate(
      nome,
      ingredientes,
      imagem,
    )
    return produtos
  }

  async deleteProduto(id_produto){
    const produto = await produtoRepositorio.produtoDelete(id_produto)
    return produto
  }
}

module.exports = ProdutoService;
