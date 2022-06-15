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

  async deleteProduto(id_produto,id_usuario, nivel ){
    const outroPorduto = await produtoRepositorio.findUniqueProduto(id_produto)
    if(outroPorduto.id_usuario === id_usuario || nivel === 'ADMINISTRADOR'){
      console.log('deu ruim papai')
      const produto = await produtoRepositorio.produtoDelete(id_produto)
      return produto
    }
    return new Error('Erroooo')
  }

  async denunciaProduto(id_produto) {
    const produto = await produtoRepositorio.denunciaProduto(id_produto)
    return produto
  }
}

module.exports = ProdutoService;
