const express = require("express");
const clientController = require("../controllers/clienteController");

const router = express.Router();

router.post("/", clientController.createCliente);

module.exports = router;
