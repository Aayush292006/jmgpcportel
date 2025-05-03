const express = require("express");
const router = express.Router();
const { assignSeating } = require("../controllers/adminController");

router.post("/assign-seating", assignSeating);

module.exports = router;
