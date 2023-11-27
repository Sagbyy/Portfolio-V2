const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth")

router.post("/", auth, multer, projectController.createProject);
router.delete("/:id", auth, multer, projectController.deleteProject);
router.get("/:id", multer, projectController.getOneProject);
router.get("/", multer, projectController.getProjects);
router.put("/:id", auth, multer, projectController.modifyProjects);

module.exports = router;
