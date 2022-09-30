const express = require("express");
const router = express.Router();
const visitControllers = require("../controllers/visitControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/tokenAuth");



router.post("/visit",verifyToken, visitControllers.createVisit);
router.delete("/visit",verifyToken, visitControllers.cancelVisit);
router.get("/visit",verifyToken, visitControllers.getVisitWithSearch);


module.exports = router;
