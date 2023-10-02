const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCliente(request, response) {
  try {
    const { nome, email, senha, cpf, telefone, endereco } = request.body;

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        senha,
        cpf,
        telefone,
        endereco,
      },
    });

    return response.status(201).send(cliente);
  } catch (err) {
    response.status(500).send({ error: err });
  }
}

module.exports = {
  createCliente,
};
