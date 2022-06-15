const prisma = require("../../../../database/prismaClient");

const findUniqueComment = async (id_comentario) => {
	const result = await prisma.comentario.findUnique({
		where: {
			id_comentario,
		},
	});
	return result;
};

const commentCreate = async (data) => {
	const comment = await prisma.comentario.create({
		data: {
			mensagem: data.mensagem,
			status: null,
			data_comentario: new Date(),
			editado: false,
			feedbacks_comentarios: 0,
			id_produto: data.id_produto,
			id_usuario: data.id_usuario,
			id_aprovado: data.id_aprovado,
		},
	});
	return comment;
};

const commentRead = async () => {
	const result = await prisma.comentario.findMany();
	return result;
};

const commentUpdate = async (
	id_comentario,
	data,
	mensagem,
	status,
) => {
	const comentario = await prisma.comentario.findFirst({
		where: {id_comentario},
	});
	const result = await prisma.comentario.update({
		where: {id_comentario},
		data: {
			mensagem: mensagem,
			status: status,
			data_comentario: new Date(),
			editado: true,
			feedbacks_comentarios: data.feedbacks_comentarios,
			id_produto: comentario.id_produto,
			id_usuario: comentario.id_usuario,
			id_aprovado: comentario.id_aprovado
		},
	});
	return result;
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
	commentDelete
};

