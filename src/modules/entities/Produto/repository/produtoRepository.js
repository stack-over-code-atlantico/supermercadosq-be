const prisma = require('../../../../database/prismaClient');
const { produto } = require('../../../../database/prismaClient');

const findUniqueProduto = async id_produto => {
  const result = await prisma.produto.findFirst({
    where: { id_produto }
  });
  return result;
};

const produtosRead = async () => {
  const result = await prisma.produto.findMany({});
  return result;
};

const produtosCreate = async (nome, ingredientes, imagem, id_usuario) => {
  const result = await prisma.produto.create({
    data: {
      nome,
      ingredientes,
      imagem,
      status: null,
      data_postagem: new Date(),
      feedbacks_produtos: 0,
      id_usuario,
      editado: false,
      id_admin_relator: null
    }
  });
  return result;
};

const produtosUpdate = async (id_produto, nome, ingredientes, imagem) => {
  const produto = await prisma.produto.findFirst({
    where: { id_produto }
  });
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      nome: nome ? nome : produto.nome,
      ingredientes: ingredientes ? ingredientes : produto.ingredientes,
      imagem: imagem ? nome : produto.imagem
    }
  });
  return result;
};

const produtoDelete = async id_produto => {
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      status: 'REPROVADO'
    }
  });
  return result;
};

const produtoDeleteAdmin = async (id_produto, id_usuario) => {
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      status: "REPROVADO",
      id_admin_relator: id_usuario
    }
  });
};

const denunciaProduto = async id_produto => {
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      status: 'ANALISE'
    }
  });
  return result;
};

module.exports = {
  findUniqueProduto,
  produtosRead,
  produtosCreate,
  produtosUpdate,
  produtoDelete,
  produtoDeleteAdmin,
  denunciaProduto
};
