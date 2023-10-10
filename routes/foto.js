// routes/foto.js
const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");

router.post("/create", fotoController.createFoto);
router.get("/list", fotoController.listFotos);
router.get("/:id", fotoController.getFotoById);
router.put("/:id", fotoController.updateFotoById);
router.delete("/:id", fotoController.deleteFotoById);

module.exports = router;
