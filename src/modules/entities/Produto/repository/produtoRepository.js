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

const produtosCreate = async (nome, alergia, ingredientes, imagem,descricao, id_usuario) => {
  const result = await prisma.produto.create({
    data: {
      nome,
      alergia,
      ingredientes,
      imagem,
      descricao,
      status: null,
      data_postagem: new Date(),
      id_usuario,
      editado: false,
      id_admin_relator: null
    }
  });
  return result;
};

const produtosUpdate = async (id_produto, nome, alergia, ingredientes, imagem,descricao) => {
  const produto = await prisma.produto.findFirst({
    where: { id_produto }
  });
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      nome: nome ? nome : produto.nome,
      alergia: alergia ? alergia : produto.alergia,
      ingredientes: ingredientes ? ingredientes : produto.ingredientes,
      imagem: imagem ? nome : produto.imagem,
      descricao: descricao ? descricao : produto.descricao,
      editado: true
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
  return result;
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

const analisaDenuncia = async(id_produto, id_usuario, status) => {
  const result = await prisma.produto.update({
    where: {id_produto},
    data:{
      status: status,
      id_admin_relator: id_usuario,
    }
  })
  return result
}

module.exports = {
  findUniqueProduto,
  produtosRead,
  produtosCreate,
  produtosUpdate,
  produtoDelete,
  produtoDeleteAdmin,
  denunciaProduto,
  analisaDenuncia
};
