const produtoRepositorio = require('../repository/produtoRepository');
const { sign } = require('jsonwebtoken');

class ProdutoService {
  async listAllProduct () {
    const product = await produtoRepositorio.productRead();
    return product;
  }

  async createProduct (
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
  ) {
    const alreadyHaveProduct = await produtoRepositorio.findUniqueProduct(id_produto);
    
    if (alreadyHaveProduct) throw new Error(`Already have product.`);
    
    const product = await produtoRepositorio.productCreate(
        nome,              
        ingredientes,  
        imagem,            
        data_postagem,
        status,          
        feedbacks_produtos,
        id_usuario,  
        editado,       
        id_admin_relator,
    );
    return product;
  }

  async updateProduct (
    id_produto,
    nome,              
    ingredientes,      
    imagem,       
    feedbacks_produtos,
    id_usuario 
  ) {
    const product = await produtoRepositorio.productUpdate(
        id_produto,
        nome,              
        ingredientes,  
        imagem,            
        data_postagem,
        status,          
        feedbacks_produtos,
        editado,       
        id_admin_relator, 
    );
    return product;
  }
  
  async deleteProduct (id_produto) {
    const product = await produtoRepositorio.productDelete(id_produto);
    return product;
  }
}

module.exports = ProdutoService;