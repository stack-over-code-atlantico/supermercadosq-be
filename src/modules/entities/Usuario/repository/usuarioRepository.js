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

const findUniqueRestriction = async (restricao_alimenticia) => {
  const result = await prisma.usuario.findUnique({
    where: { restricao_alimenticia },
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

const usersDelete = async (
  cpf_cnpj,
  nome,
  nome_social = null,
  email,
  senha,
  ativo,
  nivel,
  telefone = null,
  restricao_alimenticia = null,
  ) => {
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      nome,
      nome_social,
      email,
      senha,
      ativo,
      nivel,
      telefone,
      restricao_alimenticia,
    },
  });
  return result;
};

const usersUpdate = async (
  cpf_cnpj,
  nome,
  nome_social = null,
  email,
  senha,
  nivel,
  telefone = null,
  restricao_alimenticia = null,
  ) => {
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      nome,
      nome_social,
      email,
      senha,
      nivel,
      telefone,
      restricao_alimenticia,
    },
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
};
