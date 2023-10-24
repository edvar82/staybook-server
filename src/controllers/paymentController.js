const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer")

const { Temporal } = require('@js-temporal/polyfill');

function getDate() {
    const dateTime = Temporal.Now.plainDateTimeISO().toString();
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    
    const [fullHour, milliseconds] = time.split('.');
    milliseconds.split('Z');
    const [formattedHour, minutes, seconds] = fullHour.split(':');

  const completeDate = new Date(`${year}-${month}-${day}T${fullHour}`);
  const localTimeZoneOffset = completeDate.getTimezoneOffset();
  completeDate.setMinutes(completeDate.getMinutes() - localTimeZoneOffset);

  const now = `${year}-${month}-${day} ${formattedHour}:${minutes}:${seconds}`;

  return now;
}

const tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "facstaybook@gmail.com",
        pass: "St@ybook123",
    },
});


async function createPayment(request, response) {
    console.log('oi');
    const { clienteId, hotelId, nomeHotel, checkIn, checkOut, numQuartos, valor, metodoPagamento, idCartao } = request.body;
    if(!clienteId || !hotelId || !nomeHotel || !checkIn || !checkOut || !numQuartos || !valor || !metodoPagamento){
      return response.status(400).send({ error: "Dados faltando" });
    }
  try {
    if(metodoPagamento == "cartao"){
      const cartao = await prisma.cartao.findUnique({
        where: {
          id: idCartao,
        },
      });
    }

    const cliente = await prisma.cliente.findUnique({
      where: {
        id: clienteId,
      },
    });


    const reserva = await prisma.reserva.create({
        data: {
            checkIn,
            checkOut,
            numQuartos,
            valor,
            hotelId,
            clienteId
        }
    });

    const transacao = await prisma.transacao.create({
        data: {
            valor,
            data: `${getDate()}`,
            metodoPagamento,
            reservaId: reserva.id
        }
    });

    const mailOptions = {
        from: "facstaybook@gmail.com",
        to: `${cliente.email}`,
        subject: "Confirmação de reserva",
        text: `Olá ${cliente.nome}, sua reserva no hotel ${nomeHotel} foi confirmada.`
    }

    await tranporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
            console.log("Email enviado: " + info.response);
        }
    });

    return response.status(201).send(`Criada a reserva com sucesso! ${reserva}, ${transacao}`);
  } catch (err) {
    console.log(err);
    response.status(500).send({ error: err });
  }
}



module.exports = {
  createPayment,
};
