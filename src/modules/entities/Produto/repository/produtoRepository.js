const prisma = require("../../../../database/prismaClient");

const findUniqueProduct = async (id_produto) => {
	const result = await prisma.produto.findUnique({
		where: {
			id_produto
		},
	});

    if(!result)
    console.log('Product does not exist');

    else
    console.log(result)

	return result;
};

const productRead = async () => {
	const result = await prisma.produto.findMany();
    console.log(result)
	return result;
};

const productCreate = async (
    nome,
    ingredientes,
    imagem,
    feedbacks_produtos,
    id_usuario
) => {
	const result = await prisma.produto.create({
		data: {
            nome: nome,              
            ingredientes: ingredientes,  
            imagem: imagem,            
            data_postagem: new Date(),
            status: null,          
            feedbacks_produtos: feedbacks_produtos,
            id_usuario: id_usuario,  
            editado: false,       
            id_aprovado: null       
		},
	});
	return result;
};

const productUpdate = async (
    id_produto,     
    nome,              
    ingredientes,      
    imagem,       
    feedbacks_produtos,
    id_usuario      
) => {
    const product = await prisma.produto.findFirst({
        where: {id_produto},
    });
	const result = await prisma.produto.update({
        where: {id_produto},
		data: {
            nome: nome,              
            ingredientes: ingredientes,  
            imagem: imagem,            
            data_postagem: product.data_postagem,
            status: product.status,          
            feedbacks_produtos: feedbacks_produtos,
            editado: true,       
            id_aprovado: product.id_aprovado        
		},
	});
    return result;
};

const productDelete = async (id_produto) => {
    try{
    const result = await prisma.produto.delete({
        where: {
            id_produto,
        },
    });
    console.log('Product removed successfully. Below is the product information.');
    console.log(result);
    return result;
    }catch (e){
    console.log('Product does not exist');
    }
};

// productUpdate (
//     10,
//     'Barra de Cereal Morango com Chocolate e Canela e limão',
//     'INGREDIENTES: CEREAIS (AVEIA E FLOCOS DE CEREAIS), GLICOSE DE MILHO, COBERTURA SABOR CHOCOLATE, AÇÚCAR INVERTIDO, GORDURA VEGETAL, POLPA DE MORANGO, CASSIS, CENOURA, CORANTE BETACAROTENO, ANTIOXIDANTE LECITINA DE SOJA, ACIDULANTES ÁCIDO CÍTRICO E LÁCTICO E AROMATIZANTE. CONTÉM GLÚTEN. CONTÉM LACTOSE. ALÉRGICOS: CONTÉM AVEIA, LEITE E DERIVADOS DE CEVADA E DE SOJA. PODE CONTER AMÊNDOA, AMENDOIM, AVELÃ, CASTANHA-DE-CAJU, CASTANHA-DO-BRASIL, CENTEIO, LÁTEX NATURAL, MACADÂMIA, NOZES, PECÃS, PISTACHE E DERIVADOS DE TRIGO.',
//     null,
//     null,
//     13,
// );
// productRead();
// findUniqueProduct(10);
// productDelete(9);

module.exports = {
	findUniqueProduct,
	productRead,
    productCreate,
    productDelete,
    productUpdate,
};
