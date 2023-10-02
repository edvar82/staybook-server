const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const clienteRouter = require("./src/routes/clienteRouter");
const cartaoRouter = require("./src/routes/cartaoRouter");

app.use("/cliente", clienteRouter);
app.use("/cartao", cartaoRouter);

module.exports = app;
