const prisma = require('../../../../database/prismaClient');

const addressRead = async () => {
  const result = await prisma.endereco.findMany();
  return result; 
};

const addressCreate = async (
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
  id_usuario,
) => {
  const result = await prisma.endereco.create({
    data: {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      id_usuario,
    },
  });
  return result;
};

const addressDelete = async (id_endereco) => {
  const result = await prisma.endereco.delete({
    where: {
      id_endereco,
    },
  });
  return result;
};

const addressUpdate = async (
  id_endereco,
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
  id_usuario,
) => {
  
  const result = await prisma.endereco.update({
    where: { id_endereco },
    data: {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      id_usuario,
    },
  });
  return result;
};

module.exports = {
  addressRead,
  addressCreate,
  addressDelete,
  addressUpdate,
};