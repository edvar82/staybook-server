const express = require("express");
const favoritoController = require("../controllers/favoritoController");

const router = express.Router();

router.post("/", favoritoController.createFavorito);
router.delete("/", favoritoController.deleteFavorito);
router.get("/:id", favoritoController.getFavoritoById);
router.get("/", favoritoController.getFavoritos);
router.get("/cliente/:id", favoritoController.getFavoritosByClienteId);


module.exports = router;
