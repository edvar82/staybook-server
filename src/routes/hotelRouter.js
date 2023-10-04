const express = require("express");
const hotelController = require("../controllers/hotelController");

const router = express.Router();

router.get("/:id", hotelController.getHotelById);
router.get("/", hotelController.getHotels);
router.post("/", hotelController.createHotel);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);

module.exports = router;
