const express = require("express");
const clientController = require("../controllers/clienteController");

const router = express.Router();

router.post("/", clientController.createCliente);
router.post("/login", clientController.loginCliente);
router.get("/:clienteId", clientController.getClienteById);

module.exports = router;
