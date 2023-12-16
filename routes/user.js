// routes/user.js
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const userController = require("../controllers/userController");
const authController = require("../middleware/authMiddleware");

router.post("/create", upload.single("fotoPerfil"), userController.createUser);
router.post("/login", userController.login);
router.get("/list", authController.checkToken, userController.listUsers);
router.get("/:id", authController.checkToken, userController.getUserById);
router.put("/:id", authController.checkToken, userController.updateUserById);
router.delete("/:id", authController.checkToken, userController.deleteUserById);
router.get("/:nomeUsuario", authController.checkToken, userController.getUserByName);

module.exports = router;
