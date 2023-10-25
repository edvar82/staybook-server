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


const transporter = nodemailer.createTransport({
  service: "Gmail", // Por exemplo, "Gmail"
  auth: {
    user: "facstaybook@gmail.com", // Seu endereço de e-mail
    pass: "St@ybook123", // Sua senha de e-mail
  },
});

// Função para enviar um e-mail
async function sendEmail(to, subject, text) {
  try {
    // Configurar os detalhes do e-mail
    const mailOptions = {
      from: "facstaybook@gmail.com", // Seu endereço de e-mail
      to: to, // Destinatário
      subject: subject, // Assunto
      text: text, // Corpo do e-mail (texto simples)
    };

    // Enviar o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.response);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
}


async function createPayment(request, response) {
  const { clienteId, hotelId, checkIn, checkOut, numQuartos, valor, metodoPagamento, hotelName, hotelImg} = request.body;
  try {
    const reserva = await prisma.reserva.create({
        data: {
            checkIn,
            checkOut,
            numQuartos,
            valor,
            hotelId,
            clienteId,
            hotelName,
            hotelImg
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

    // sendEmail(`${cliente.email}`, "Confirmação de reserva", `Olá ${cliente.nome}, sua reserva no hotel ${nomeHotel} foi confirmada.`)

    return response.status(201).send(`Criada a reserva com sucesso! ${reserva}, ${transacao}`);
  } catch (err) {
    console.log(err);
    response.status(500).send({ error: err });
  }
}



module.exports = {
  createPayment,
};
