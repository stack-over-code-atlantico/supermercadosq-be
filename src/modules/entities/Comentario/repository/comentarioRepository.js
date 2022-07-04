const prisma = require("../../../../database/prismaClient");
const { hash } = require('bcrypt');

const findUniqueComment = async (id_comentario) => {
	const result = await prisma.comentario.findUnique({
		where: { id_comentario },
		include: { usuario_comentario_id_usuarioTousuario:true }
	});
	return result;
};

const findByProduct = async (id_produto) => {
	const result = await prisma.comentario.findMany({
		where: { id_produto, OR:[{status:null},{status:'APROVADO'}] },
		include: { usuario_comentario_id_usuarioTousuario:true }
	});
	return result;
};

const createComment = async (mensagem, id_produto, id_usuario) => {
	const result = await prisma.comentario.create({
		data: {
			mensagem,
			status: null,
			data_comentario: new Date(),
			editado: false,
			id_produto,
			id_usuario,
			id_admin_relator: null
		},
	});
	return result;
};

const readComment = async () => {
	const result = await prisma.comentario.findMany();
	return result;
};

const updateComment = async (id_comentario, mensagem) => {
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

const deleteComment = async (id_comentario) => {
	const result = await prisma.comentario.update({
		where: { id_comentario },
		data: { 
			status: 'REPROVADO'
		}
	});
	return result;
};

const commentDeleteByUser = async (id_usuario,id_admin_relator) => {
  const result = await prisma.comentario.updateMany({
    where: { id_usuario },
    data: {
      status: 'REPROVADO',
			id_admin_relator
    }
  });
  return result;
}

const deleteAdminComment = async (id_comentario, id_usuario) => {
	const result = await prisma.comentario.update({
		where: { id_comentario },
		data: {
			status: 'REPROVADO',
			id_admin_relator: id_usuario
		}
	});
	return result;
};

const reportComment = async id_comentario => {
	const result = await prisma.comentario.update({
		where: { id_comentario },
		data: {
			status: 'ANALISE'
		}
	});
	return result;
};

const reviewReportComment = async (id_comentario, id_usuario, status) => {
	const result = await prisma.comentario.update({
		where: { id_comentario },
		data: {
			status: status,
			id_admin_relator: id_usuario
		}
	})
	return result;
}

module.exports = {
	findUniqueComment,
	findByProduct,
	createComment,
	readComment,
	updateComment,
	deleteComment,
	deleteAdminComment,
	reportComment,
	reviewReportComment,
	commentDeleteByUser
};

