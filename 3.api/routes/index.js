const express = require("express");
const router = express.Router();

const customerRoute = require("./customers");
const ticketRoute = require("./ticket");
const visitRoute = require("./visit");

router.use("/api", customerRoute);
router.use("/api", ticketRoute);
router.use("/api", visitRoute);


module.exports = router