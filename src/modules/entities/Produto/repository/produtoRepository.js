const prisma = require("../../../../database/prismaClient");

const findUniqueProduct = async (id_produto) => {
	const result = await prisma.produto.findUnique({
		where: {
			id_produto,
		},
	});
	return result;
};

const productRead = async () => {
	const result = await prisma.produto.findMany();
	return result;
};

const productCreate = async (
    nome,
    ingredientes,
    imagem,
    data_postagem,
    editado,
    status,
    feedbacks_produtos,
    id_usuario,
    id_aprovado,
) => {
	const result = await prisma.produto.create({
		data: {
            nome,              
            ingredientes,  
            imagem,            
            data_postagem,     
            editado,           
            status,          
            feedbacks_produtos,
            id_usuario,        
            id_aprovado       
		},
	});
	return result;
};

const productDelete = async (id_produto) => {
    const result = await prisma.produto.delete({
        where: {
            id_produto,
        },
    });
    return result;
};

const productUpdate = async (
    nome,
    ingredientes,
    imagem,
    editado,
    status,
    feedbacks_produtos,
    id_aprovado,
) => {
    const product = await prisma.produto.findFirst({
        where: {id_produto},
    });
	const result = await prisma.produto.create({
        where: {id_produto},
		data: {
            nome: nome ? nome : product.nome,              
            ingredientes: ingredientes ? ingredientes : product.ingredientes,  
            imagem: imagem ? imagem : product.imagem,
            editado: true,           
            status: status ? status : product.status,          
            feedbacks_produtos: feedbacks_produtos ? feedbacks_produtos : product.feedbacks_produtos,    
            id_aprovado: id_aprovado ? id_aprovado : product.id_aprovado,       
		},
	});
	return result;
};

productRead();

module.exports = {
	findUniqueProduct,
	productRead,
    productCreate,
    productDelete,
    productUpdate,
};
