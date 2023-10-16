// routes/foto.js
const express = require("express");
const router = express.Router();
const fotoController = require("../controllers/fotoController");
const authController = require("../middleware/authMiddleware");

router.post("/create", authController.checkToken, fotoController.createFoto);
router.get("/list", authController.checkToken, fotoController.listFotos);
router.get("/:id", authController.checkToken, fotoController.getFotoById);
router.put("/:id", authController.checkToken, fotoController.updateFotoById);
router.delete("/:id", authController.checkToken, fotoController.deleteFotoById);

module.exports = router;
