const express = require("express");
const cartaoController = require("../controllers/cartaoController");
const { route } = require("./clienteRouter");

const router = express.Router();

router.post("/:clienteId", cartaoController.createCartao);
router.get("/:clienteId", cartaoController.getCartaoFromClienteId);
router.delete("/:cartaoId", cartaoController.deleteCartao);

module.exports = router;
