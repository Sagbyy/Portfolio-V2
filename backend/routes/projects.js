const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects");
const multer = require("../middleware/multer-config");

router.post("/create", multer, projectController.createProject);
router.post("/delete/:id", multer, projectController.deleteProject);
router.get("/:id", multer, projectController.getOneProject);
router.get("/", multer, projectController.getProjects);
router.put("/:id", multer, projectController.modifyProjects);

module.exports = router;
