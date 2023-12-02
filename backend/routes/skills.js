const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skills");
const uploadMulter = require("../middleware/multer-config");
const auth = require("../middleware/auth")

router.post("/create", auth, uploadMulter, skillController.createSkill);
router.get("/all", skillController.getAllSkills);
router.get("/:id", skillController.getOneSkill);
router.delete("/:id", auth, skillController.deleteSkill);

module.exports = router;
