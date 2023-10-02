const express = require("express");
const clientController = require("../controllers/clienteController");

const router = express.Router();

router.post("/", clientController.createCliente);
router.get("/", clientController.loginCliente);

module.exports = router;
