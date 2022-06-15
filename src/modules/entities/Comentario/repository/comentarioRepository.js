const prisma = require("../../../../database/prismaClient");

const findUniqueComment = async (id_comentario) => {
	const result = await prisma.comentario.findUnique({
		where: {
			id_comentario,
		},
	});
	return result;
};

const commentCreate = async (mensagem, id_produto, id_usuario) => {
	const result = await prisma.comentario.create({
		data: {
			mensagem,
			status: null,
			data_comentario: new Date(),
			editado: false,
			feedbacks_comentarios: 0,
			id_produto,
			id_usuario,
			id_admin_relator: null
		},
	});
	return result;
};

const commentRead = async () => {
	const result = await prisma.comentario.findMany();
	return result;
};

const commentUpdate = async (id_comentario, mensagem) => {
	const comentario = await prisma.comentario.findFirst({
		where: {id_comentario},
	});
	const result = await prisma.comentario.update({
		where: {id_comentario},
		data: {
			mensagem: mensagem ? mensagem : comentario.mensagem,
			editado: true,
		},
	});
	return result;
};

const commentUpdateAdmin = async (id_comentario, id_usuario) => {
	const result = await prisma.comentario.update({
	  where: { id_comentario },
	  data: {
		status: "REPROVADO",
		id_admin_relator: id_usuario
	}
});
};


const commentDelete = async (id_comentario) => {
	try{
		const comentario = await prisma.comentario.delete({
			where: {
				id_comentario,
			},
		});
		console.log('Comment removed successfully. Below is the comment information.');
		console.log(comentario);
		return comentario;
	} catch (e){
		console.log('Comment does not exist.');
	}
};


  

module.exports = {
	findUniqueComment,
	commentCreate,
	commentRead,
	commentUpdate,
	commentUpdateAdmin,
	commentDelete
};

