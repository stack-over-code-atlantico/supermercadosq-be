const produtoRepositorio = require('@produto/repository/produtoRepository');
const removeImage = require('../../../../utils/removeImage');

class ProdutoService {
  async listAllProdutos() {
    const produtos = await produtoRepositorio.readAllProdutos();
    return produtos;
  }

  async listProdutos(page) {
    const produtos = await produtoRepositorio.produtosRead(parseInt(page));
    return produtos;
  }
  async listHistoric(id_usuario) {
    const produtos = await produtoRepositorio.produtosReadHistoric(id_usuario);
    return produtos;
  }
  
  async listDisapprovedProdutos() {
    const produtos = await produtoRepositorio.disapprovedProdutosRead();
    return produtos;
  }

  async listAllPerAllergy(page, allergy) {
    const alergia = allergy.split(',');
    const produtos = await produtoRepositorio.produtosPerAllergy(page, alergia);
    return produtos;
  }

  async listAllNotPerAllergy(page, allergy) {
    const alergia = allergy.split(',');
    const produtos = await produtoRepositorio.produtosNotPerAllergy(page, alergia);
    return produtos;
  }

  async listOne(id_produto) {
    const produtos = await produtoRepositorio.findUniqueProduto(id_produto);
    return produtos;
  }

  async createProduto(nome, alergia, ingredientes, imagem, descricao, id_usuario) {
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
    const validProduto = await produtoRepositorio.findUniqueProduto(id_produto);
    let produto;
    if (validProduto.id_usuario === id_usuario) {
      produto = await produtoRepositorio.produtosUpdate(
        id_produto,
        nome,
        alergia,
        ingredientes,
        imagem,
        descricao
      );

      if (validProduto.imagem !== null && validProduto.imagem !== imagem) {
        removeImage(validProduto.imagem.split('.com/')[1]);
      }

      return produto;
    }
    return new Error('Unauthorized Service');
  }

  async deleteProduto(id_produto, id_usuario, nivel) {
    const validProduto = await produtoRepositorio.findUniqueProduto(id_produto);
    let produto;
    if (validProduto.id_usuario === id_usuario) {
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
