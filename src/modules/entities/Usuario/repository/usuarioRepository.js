const prisma = require('../../../../database/prismaClient');

const findUniqueUser = async (cpf_cnpj) => {
  const result = await prisma.usuario.findUnique({
    where: { cpf_cnpj },
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
  const result = await prisma.usuario.findMany();
  // console.log(result);
  return result; 
};

const usersCreate = async (
  nome,
  cpf_cnpj,
  email,
  senha,
  nivel,
  nome_social = null,
  telefone = null,
  restricao_alimenticia = null,
) => {
  const result = await prisma.usuario.create({
    data: {
      nome,
      nome_social,
      cpf_cnpj,
      email,
      senha,
      ativo: true,
      nivel,
      telefone,
      restricao_alimenticia,
    },
  });
  return result; 
};

const usersDelete = async (cpf_cnpj) => {
  const result = await prisma.usuario.delete({
    where: {
      cpf_cnpj,
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
  const user = await prisma.usuario.findFirst({
    where: { cpf_cnpj },
  });
  const result = await prisma.usuario.update({
    where: { cpf_cnpj },
    data: {
      nome: nome ? nome : user.nome,
      nome_social: nome_social ? nome_social : user.nome_social,
      email: email ? email : user.email,
      senha: senha ? senha : user.senha,
      nivel: nivel ? nivel : user.nivel,
      telefone: telefone ? telefone : user.telefone,
      restricao_alimenticia: restricao_alimenticia
        ? restricao_alimenticia
        : user.restricao_alimenticia,
    },
  });
  return result;
};

// usersCreate(
//   "Teste",
//   "890342943023213",
//   "Teste@io.com",
//   "1234567",
//   "CLIENTE",
// );
// usersRead();
// usersDelete(1);
// usersUpdate();

module.exports = {
  findUniqueRestriction,
  findUniqueUser,
  usersRead,
  usersCreate,
  usersDelete,
  usersUpdate,
};
