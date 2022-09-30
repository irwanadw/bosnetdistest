const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/tokenAuth");



router.post("/ticket/print", verifyToken, ticketController.printTicket);
router.put("/ticket/cancel", verifyToken, ticketController.cancelTicket);

module.exports = router;
