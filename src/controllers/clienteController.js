const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getClientes(request, response) {
  try {
    const clientes = await prisma.cliente.findMany();

    return response.status(200).send(clientes);
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err });
  }
}

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
    console.log(err);
    response.status(500).send({ error: err });
  }
}

async function loginCliente(request, response) {
  try {
    const { email, senha } = request.body;

    const client = await prisma.cliente.findUnique({
      where: {
        email,
        senha,
      },
    });

    if (client) {
      return response.status(201).send(client);
    }

    return response.send({ error: "error" });
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err });
  }
}

async function getClienteById(resquest, response) {
  try {
    const { clienteId } = resquest.params;

    const cliente = await prisma.cliente.findFirst({
      where: {
        id: clienteId,
      },
    });

    return response.send(cliente);
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err });
  }
}

module.exports = {
  createCliente,
  loginCliente,
  getClienteById,
  getClientes,
};

