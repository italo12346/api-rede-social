// routes/comentario.js
const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.post("/create", comentarioController.createComentario);
router.get("/list", comentarioController.listComentarios);
router.get("/:id", comentarioController.getComentarioById);
router.put("/:id", comentarioController.updateComentarioById);
router.delete("/:id", comentarioController.deleteComentarioById);

module.exports = router;
