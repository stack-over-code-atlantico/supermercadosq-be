const prisma = require('../../../../database/prismaClient');

const findUniqueProduto = async id_produto => {
  const result = await prisma.produto.findFirst({
    where: { id_produto },
    include: { usuario_produto_id_usuarioTousuario:true }
  });
  return result;
};

const disapprovedProdutosRead = async () => {
  const result = await prisma.produto.findMany({
    where: {
      status: {
        equals: "REPROVADO",
      },
    },
    orderBy: {
      data_postagem: 'desc',
    },
  });

  return result;
};

const searchProducts = async (nameSearched, page) => {
  const result = await prisma.produto.findMany({
    skip: 9 * page,
    take: page === 0 ? 8 : 9,
    where: nameSearched ? (
      {
        OR: [
          { status: null },
          { status: 'APROVADO'},
          { status: 'ANALISE' }
        ],
        nome: {
          search: nameSearched
        }
      }
    ) : ({
      OR: [
        { status: null },
        { status: 'APROVADO'},
        { status: 'ANALISE' }
      ],
    }),
    include: {
      usuario_produto_id_usuarioTousuario:
      {
        select: {
          nome: true,
          cpf_cnpj: true,
          email: true,
          nivel: true,
          nome_social: true,
          ativo: true,
          telefone: true,
          restricao_alimenticia: true,
          avatar: true,
        },
      }
    },
    orderBy: {
      id_produto: 'desc',
    }
  });
  return result;
};

const produtosPerAllergy = async (page, allergy) => {
  const result = await prisma.produto.findMany({
    
    skip: 9 * page,
    take: page === 0 ? 8 : 9,
    where: {
      alergia: {
        search: allergy.join(' & ')
      }
    },
    include: {
      usuario_produto_id_usuarioTousuario:
      {
        select: {
          nome: true,
          cpf_cnpj: true,
          email: true,
          nivel: true,
          nome_social: true,
          ativo: true,
          telefone: true,
          restricao_alimenticia: true,
          avatar: true,
        },
      }
    },
  });
  return result;
};

const produtosNotPerAllergy = async (page, allergy) => {
  const result = await prisma.produto.findMany({
    skip: 9 * page,
    take: page === 0 ? 8 : 9,
    where: {
      NOT: {
        alergia: {
          search: allergy.join(' | ')
        }
      }
    },
  });
  return result;
};

const readAllProdutos = async () => {
  const result = await prisma.produto.findMany({
    where: {
      OR: [
        { status: null },
        { status: 'APROVADO'},
        { status: 'ANALISE' }
      ]
    },
    orderBy: {
      id_produto: 'asc',
    }
  });
  return result;
}

const produtosRead = async (page) => {
  const result = await prisma.produto.findMany({
    skip: 9 * page,
    take: page === 0 ? 8 : 9,
    where: {
      OR: [
        { status: null },
        { status: 'APROVADO'},
        { status: 'ANALISE' }
      ]
    },
    include: {
      usuario_produto_id_usuarioTousuario:
      {
        select: {
          nome: true,
          cpf_cnpj: true,
          email: true,
          nivel: true,
          nome_social: true,
          ativo: true,
          telefone: true,
          restricao_alimenticia: true,
          avatar: true,
        },
      }
    },
    orderBy: {
      id_produto: 'desc',
    }
  });

  return result;
};
const produtosReadHistoric = async (id_usuario) => {
  const result = await prisma.produto.findMany({
    take: 4,
    where: {
      id_usuario,
      OR: [
        { status: null },
        { status: 'APROVADO'},
        { status: 'ANALISE' }
      ]
    },
    include: {
      usuario_produto_id_usuarioTousuario:
      {
        select: {
          nome: true,
          cpf_cnpj: true,
          email: true,
          nivel: true,
          nome_social: true,
          ativo: true,
          telefone: true,
          restricao_alimenticia: true,
          avatar: true,
        },
      }
    },
    orderBy: {
      id_produto: 'desc',
    }
  });

  return result;
};

const produtosCreate = async (
  nome,
  alergia,
  ingredientes,
  imagem,
  descricao,
  id_usuario
) => {
  const result = await prisma.produto.create({
    data: {
      nome,
      alergia,
      ingredientes,
      imagem: imagem,
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


const produtosUpdate = async (
  id_produto,
  nome,
  alergia,
  ingredientes,
  imagem,
  descricao
) => {
  const produto = await prisma.produto.findFirst({
    where: { id_produto }
  });
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      nome: nome ? nome : produto.nome,
      alergia: alergia ? alergia : produto.alergia,
      ingredientes: ingredientes ? ingredientes : produto.ingredientes,
      imagem: imagem ? imagem : produto.imagem,
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
      status: 'REPROVADO',
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

const analisaDenuncia = async (id_produto, id_usuario, status) => {
  const result = await prisma.produto.update({
    where: { id_produto },
    data: {
      status: status,
      id_admin_relator: id_usuario
    }
  });
  return result;
};

module.exports = {
  findUniqueProduto,
  produtosRead,
  produtosReadHistoric,
  produtosCreate,
  produtosUpdate,
  produtoDelete,
  produtoDeleteAdmin,
  denunciaProduto,
  analisaDenuncia,
  disapprovedProdutosRead,
  produtosPerAllergy,
  produtosNotPerAllergy,
  readAllProdutos,
  searchProducts
};
