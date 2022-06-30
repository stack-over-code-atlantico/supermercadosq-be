const produtoRepositorio = require('@produto/repository/produtoRepository');

class ProdutoService {
  async listAllProdutos() {
    const produtos = await produtoRepositorio.produtosRead();
    return produtos;
  }

  async listOne(id_produto) {
    const produtos = await produtoRepositorio.findUniqueProduto(id_produto);
    return produtos;
  }

  async createProduto(nome, alergia, ingredientes, imagem,descricao, id_usuario) {
    const produtos = await produtoRepositorio.produtosCreate(
      nome,
      alergia,
      ingredientes,
      imagem,
      descricao,
      id_usuario
    );
    return produtos;
  }

  async updateProduto(
    id_produto,
    id_usuario,
    nome,
    alergia,
    ingredientes,
    imagem,
    descricao
  ) {
    const ValidProduto = await produtoRepositorio.findUniqueProduto(id_produto);
    let produto;
    if (ValidProduto.id_usuario === id_usuario) {
      produto = await produtoRepositorio.produtosUpdate(
        id_produto,
        nome,
        alergia,
        ingredientes,
        imagem,
        descricao
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
    return new Error('Unauthorized Service');
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
