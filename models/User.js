// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: String,
  usuario: String,
  email: String,
  senha: String,
  fotoPerfil: String,
  fotosPublicadas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foto" }],
});

module.exports = mongoose.model("User", userSchema);
