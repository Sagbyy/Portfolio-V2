const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skills");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth")

router.post("/create", auth, multer, skillController.createSkill);
router.get("/all", skillController.getAllSkills);
router.get("/:id", skillController.getOneSkill);
router.delete("/:id", auth, skillController.deleteSkill);
router.delete("/all", auth, skillController.deleteAllSkills);

module.exports = router;
