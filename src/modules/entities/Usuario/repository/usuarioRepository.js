const prisma = require('../../../../database/prismaClient');
const { hash } = require('bcrypt');

const findUniqueUser = async (cpf_cnpj) => {
  const result = await prisma.usuario.findFirst({
    where: { cpf_cnpj },
  });
  return result;
};

const findUserPerEmail = async (email) => {
  const result = await prisma.usuario.findFirst({
    where: { email },
  });
  return result;
};

const findUserPerId = async (id_usuario) => {
  const result = await prisma.usuario.findFirst({
    where: { id_usuario },
  });
  return result;
};

const findUniqueRestriction = async (restricao_alimenticia) => {
  const result = await prisma.usuario.findUnique({
    where: { restricao_alimenticia },
  });
  return result;
};

const usersRead = async () => {
  const result = await prisma.usuario.findMany({
    select: {
      id_usuario: true,
      nome: true,
      cpf_cnpj: true,
      email: true,
      nivel: true,
      nome_social: true,
      ativo: true,
      telefone: true,
      restricao_alimenticia: true,
      endereco: {
        select: {
          id_endereco: true,
          cep: true,
          logradouro: true,
          numero: true,
          bairro: true,
          cidade: true,
          estado: true,
        }
      }
    },
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
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
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
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
        },
      },
    },
  });
  return result; 
};

const usersDelete = async (cpf_cnpj) => {
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      ativo: false
    },
  });
  return result;
};

const nivelEdit = async (cpf_cnpj, nivel) => {
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: { nivel },
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
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
) => {
  // const password = await hash(senha, 8);
  const user = await prisma.usuario.findFirst({ 
    where: { cpf_cnpj },
    include: {
    endereco: true,
  } });
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      nome: nome ? nome : user.nome,
      nome_social:  nome_social ? nome_social : user.nome_social ,
      email:  email ? email : user.email ,
      senha:  senha ? await hash(senha, 8) : user.senha ,
      telefone:  telefone ? telefone : user.telefone ,
      restricao_alimenticia:  restricao_alimenticia ? restricao_alimenticia  : user.restricao_alimenticia,
      endereco: {
        update: {
          where: { id_endereco: user.endereco[0].id_endereco },
          data: {
            logradouro: logradouro ? logradouro : user.endereco[0].logradouro,
            numero: numero ? numero : user.endereco[0].numero,
            bairro: bairro ? bairro : user.endereco[0].bairro,
            cidade: cidade ? cidade : user.endereco[0].cidade,
            estado: estado ? estado : user.endereco[0].estado
          }
        }
      }
    },
  });
  return result;
};

module.exports = {
  findUniqueRestriction,
  findUniqueUser,
  findUserPerId,
  findUserPerEmail,
  usersRead,
  usersCreate,
  usersDelete,
  usersUpdate,
  nivelEdit,
};
