const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Hotel = prisma.Hotel;

async function createHotel(request, response) {
  try {
    const { nome, endereco, telefone, site } = request.body;

    const hotel = await Hotel.create({
      data: {
        nome,
        endereco,
        telefone,
        site,
      },
    });

    return response.status(201).send(hotel);
  } catch (err) {
    console.log(err)
    response.status(500).json({ error: err });
  }
}

async function getHotelById(request, response) {
  try {
    const { id } = request.params;

    const hotel = await Hotel.findUnique({
      where: {
        id,
      },
    });

    return response.status(200).send(hotel);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function getHotels(request, response) {
  try {
    const hotels = await Hotel.findMany();

    return response.status(200).send(hotels);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function updateHotel(request, response) {
  try {
    const { id } = request.params;
    const { nome, endereco, telefone, site } = request.body;

    const hotel = await Hotel.update({
      where: {
        id,
      },
      data: {
        nome,
        endereco,
        telefone,
        site,
      },
    });

    return response.status(200).send(hotel);
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

async function deleteHotel(request, response) {
  try {
    const { id } = request.params;

    await Hotel.delete({
      where: {
        id,
      },
    });

    return response.status(200).json({ message: 'Hotel deletado com sucesso!' });
  } catch (err) {
    response.status(500).json({ error: err });
  }
}

module.exports = {
    createHotel,
    getHotelById,
    getHotels,
    updateHotel,
    deleteHotel,
};