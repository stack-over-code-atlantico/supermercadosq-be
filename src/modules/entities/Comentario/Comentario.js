const prisma = require("../../../database/prismaClient");

const findUniqueComment = async (id_comentario) => {
	const result = await prisma.comentario.findUnique({
		where: {
			id_comentario,
		},
	});
	return result;
};

const commentRead = async () => {
	const result = await prisma.comentario.findMany();
	return result;
};

const create = async (data) => {
	const comentario = await prisma.comentario.create({
		data: {
			mensagem: data.mensagem,
			status: data.status,
			data_comentario: new Date(),
			editado: false,
			feedbacks_comentarios: data.feedbacks_comentarios,
			id_produto: data.id_produto,
			id_usuario: data.id_usuario,
			id_aprovado: data.id_aprovado,
		},
	});
	return comentario;
};

module.exports = {
	create,
	findUniqueComment,
};
