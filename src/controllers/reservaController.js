const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Reserva = prisma.reserva;

async function createReserva(request, response) {
  try {
    const { checkIn, checkOut, numQuartos, valor } = request.body;

    const reserva = await Reserva.create({
      data: {
        checkIn,
        checkOut,
        numQuartos,
        valor,
      },
    });

    return response.status(201).send(reserva);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function getReservaById(request, response) {
  try {
    const { id } = request.params;

    const reserva = await Reserva.findUnique({
      where: {
        id,
      },
    });

    return response.status(200).send(reserva);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function getReservas(request, response) {
  try {
    const reservas = await Reserva.findMany();

    return response.status(200).send(reservas);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function updateReserva(request, response) {
  try {
    const { id } = request.params;
    const { checkIn, checkOut, numQuartos, valor } = request.body;

    const reserva = await Reserva.update({
      where: {
        id,
      },
      data: {
        checkIn,
        checkOut,
        numQuartos,
        valor,
      },
    });

    return response.status(200).send(reserva);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function deleteReserva(request, response) {
  try {
    const { id } = request.params;

    await Reserva.delete({
      where: {
        id,
      },
    });

    return response
      .status(200)
      .json({ message: 'Reserva deletada com sucesso!' });
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

module.exports = {
  createReserva,
  getReservaById,
  getReservas,
  updateReserva,
  deleteReserva,
};
