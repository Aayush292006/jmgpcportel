const express = require("express");
const router = express.Router();
const seatingPlanController = require("../controllers/seatingPlanController");

router.get("/get_rooms", seatingPlanController.getRooms);
router.get("/get_students", seatingPlanController.getStudents);
router.get("/get_branches", seatingPlanController.getBranches);

module.exports = router;
