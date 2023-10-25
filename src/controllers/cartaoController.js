const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCartao(request, response) {
  try {
    const { clienteId } = request.params;
    const { numero, nomeTitular, dataValidade, cvv } = request.body;

    const cartao = await prisma.cartao.create({
      data: {
        numero,
        nomeTitular,
        dataValidade,
        cvv,
        clienteId,
      },
    });

    // const cliente = await prisma.cliente.update({
    //   where: {
    //     id: clienteId,
    //   },
    //   data: {
    //     Cartoes: {
    //       create: [cartao.id],
    //     },
    //   },
    // });

    return response.json(cartao);
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err });
  }
}

async function getCartaoFromClienteId(request, response) {
  try {
    const { clienteId } = request.params;

    const cartoes = await prisma.cartao.findMany({
      where: {
        clienteId,
      },
    });

    return response.status(200).send(cartoes);
  } catch (err) {
    console.log(err);
    return response.status(500).send({ error: err });
  }
}

async function deleteCartao(request, response) {
  try {
    const { cartaoId } = request.params;

    const cartao = await prisma.cartao.delete({
      where: {
        id: cartaoId,
      },
    });
    return response.status(200).send(cartao);
  } catch (err) {
    return response.status(500).send({ error: err });
  }
}

module.exports = {
  createCartao,
  getCartaoFromClienteId,
  deleteCartao,
};
