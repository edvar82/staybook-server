const express = require("express");
const reservaController = require("../controllers/reservaController");

const router = express.Router();

router.get("/:id", reservaController.getReservaById);
router.get("/", reservaController.getReservas);
router.post("/", reservaController.createReserva);
router.put("/:id", reservaController.updateReserva);
router.delete("/:id", reservaController.deleteReserva);

module.exports = router;
