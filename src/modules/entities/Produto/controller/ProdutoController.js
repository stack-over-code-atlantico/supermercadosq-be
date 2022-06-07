const ProdutoService = require('../services/ProdutoService');

const productService = new ProdutoService();

class ProdutoController {
  
  async list (req, res) {
    const product = await productService.listAllProduct();
    return res.json(product);
  }

  async create (req, res) {
    const {
        nome,
        ingredientes,
        imagem,
        feedbacks_produtos,
        id_usuario
    } = req.body;
    const product = await productService.createProduct(
        nome,              
        ingredientes,  
        imagem,            
        data_postagem,
        status,          
        feedbacks_produtos,
        id_usuario,  
        editado,       
        id_aprovado,
    );
    return res.status(201).json(product);
  }

  async update (req, res) {
    const { id_produto } = req.params;
    const {    
        nome,              
        ingredientes,      
        imagem,       
        feedbacks_produtos,
        id_usuario 
    } = req.body;
    const product = await productService.updateProduct(
        nome,              
        ingredientes,  
        imagem,            
        data_postagem,
        status,          
        feedbacks_produtos,
        editado,       
        id_aprovado, 
    );
    return res.status(204).json(product);
  }
  
  async delete (req, res) {
    const { id_produto } = req.params;
    const product = await productService.deleteProduct(id_produto);
    return res.status(204).send(product);
  }
}

module.exports = ProdutoController;