const prisma = require('../../../../database/prismaClient');

const usersList = async () => {
  const result = await prisma.usuario.findMany();
  console.log(result);
  return result; 
};

const usersCreate = async () => {
  const result = await prisma.usuario.create({
    data: {
      nome: "Emanuel",
      cpf_cnpj: "1234563128941293",
      email: "manelzin@teste.com",
      senha: "123deoliveira4",
      ativo: true,
      nivel: "CLIENTE",
    }
  });
  return result; 
};

// usersCreate();
usersList();