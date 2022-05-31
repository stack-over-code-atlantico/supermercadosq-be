const prisma = require("../../../database/prismaClient");

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

const productCreate = async (data) => {
	const product = await prisma.produto.create({
		data: {
            nome: data.nome,              
            ingredientes: data.ingredientes,  
            imagem: data.imagem,            
            data_postagem: new Date(),     
            editado: false,           
            status: data.status,          
            feedbacks_produtos: data.feedbacks_produtos,
            id_usuario: data.id_produto,        
            id_aprovado: data.id_aprovado       
		},
	});
	return product;
};

productCreate(
    nome = "Leite em Pó Integral 800g",
    ingredientes = "Leite em pó integral reinspecionado. Alérgicos: Contém Leite, Contém Lactose, Não contém glúten",
    imagem = null,
    data_postagem = now(),
    editado = false,
    status = null,
    feedbacks_produtos = null,
    id_usuario = 3,
    id_aprovado = null
);

module.exports = {
	create,
	findUniqueProduct,
};
