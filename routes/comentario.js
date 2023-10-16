// routes/comentario.js
const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const authController = require("../middleware/authMiddleware");

router.post("/create", authController.checkToken, comentarioController.createComentario);
router.get("/list",authController.checkToken, comentarioController.listComentarios);
router.get("/:id",authController.checkToken, comentarioController.getComentarioById);
router.put("/:id",authController.checkToken, comentarioController.updateComentarioById);
router.delete("/:id",authController.checkToken, comentarioController.deleteComentarioById);

module.exports = router;
