const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skills");
const multer = require("../middleware/multer-config");

router.post("/create", multer, skillController.createSkill);
router.get("/all", skillController.getAllSkills);
router.get("/:id", skillController.getOneSkill);
router.delete("/:id", skillController.deleteSkill);
router.delete("/all", skillController.deleteAllSkills);

module.exports = router;
