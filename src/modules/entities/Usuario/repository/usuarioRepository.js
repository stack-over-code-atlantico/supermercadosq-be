const prisma = require('../../../../database/prismaClient');
const { hash } = require('bcrypt');
const { usuario, endereco } = require('../../../../database/prismaClient');
const comentarioRepositorio = require('@comentario/repository/comentarioRepository');

const findUniqueUser = async cpf_cnpj => {
  const result = await prisma.usuario.findFirst({
    where: { cpf_cnpj }
  });
  return result;
};

const findUserPerEmail = async email => {
  const result = await prisma.usuario.findFirst({
    where: { email }
  });
  return result;
};

const findUniqueRestriction = async restricao_alimenticia => {
  const result = await prisma.usuario.findUnique({
    where: { restricao_alimenticia }
  });
  return result;
};

const usersRead = async () => {
  const result = await prisma.usuario.findMany({
    include: { endereco: true }
  });

  return result;
};

const usersCreate = async (
  nome,
  nome_social = null,
  cpf_cnpj,
  email,
  senha,
  nivel,
  telefone = null,
  restricao_alimenticia = null,
  cep,
  logradouro,
  numero,
  bairro,
  cidade,
  estado
) => {
  const password = await hash(senha, 8);
  const result = await prisma.usuario.create({
    data: {
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha: password,
      ativo: true,
      nivel,
      telefone,
      restricao_alimenticia,
      endereco: {
        create: {
          cep,
          logradouro,
          numero,
          bairro,
          cidade,
          estado
        }
      }
    }
  });
  return result;
};

const usersDelete = async (cpf_cnpj, id_usuario, nivel) => {
  let id_admin_relator;
  if (nivel === 'ADMINISTRADOR') {
    id_admin_relator = id_usuario;
  } else {
    id_admin_relator = null;
  }

  const id_usuario_delete = await findUniqueUser(cpf_cnpj);
  if (id_usuario_delete.ativo === false) {
    return new Error('Account is already deactivated');
  }
  
  if (
    id_usuario_delete.id_usuario === id_usuario ||
    nivel === 'ADMINISTRADOR'
  ) {
    const deletaComentario = await comentarioRepositorio.commentDeleteByUser(
      id_usuario_delete.id_usuario,
      id_admin_relator
    );
    const result = await prisma.usuario.update({
      where: { cpf_cnpj },
      data: {
        ativo: false
      }
    });
    return result;
  }
  return new Error('Unauthorized Servicex');
};

const nivelEdit = async (cpf_cnpj, nivel) => {
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: { nivel }
  });
  return result;
};

const usersUpdate = async (
  cpf_cnpj,
  nome,
  nome_social,
  email,
  senha,
  telefone,
  restricao_alimenticia,
  cep,
  logradouro,
  numero,
  bairro,
  cidade,
  estado
) => {
  // const password = await hash(senha, 8);
  const user = await prisma.usuario.findFirst({
    where: { cpf_cnpj },
    include: {
      endereco: true
    }
  });
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      nome: nome ? nome : user.nome,
      nome_social: nome_social ? nome_social : user.nome_social,
      email: email ? email : user.email,
      senha: senha ? await hash(senha, 8) : user.senha,
      telefone: telefone ? telefone : user.telefone,
      restricao_alimenticia: restricao_alimenticia
        ? restricao_alimenticia
        : user.restricao_alimenticia,
      endereco: {
        update: {
          where: { id_endereco: user.endereco[0].id_endereco },
          data: {
            cep: cep ? cep : user.cep[0].cep,
            logradouro: logradouro ? logradouro : user.endereco[0].logradouro,
            numero: numero ? numero : user.endereco[0].numero,
            bairro: bairro ? bairro : user.endereco[0].bairro,
            cidade: cidade ? cidade : user.endereco[0].cidade,
            estado: estado ? estado : user.endereco[0].estado
          }
        }
      }
    }
  });
  return result;
};

module.exports = {
  findUniqueRestriction,
  findUniqueUser,
  findUserPerEmail,
  usersRead,
  usersCreate,
  usersDelete,
  usersUpdate,
  nivelEdit
};
