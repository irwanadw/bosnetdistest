const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customersController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/tokenAuth");



router.post("/customer/register", customersController.register);
router.post("/customer/login",customersController.login);

module.exports = router;
