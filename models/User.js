// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nome: String,
  usuario: String,
  email: String,
  fotoPerfil: String,
  fotosPublicadas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foto" }],
  comentariosPublicados: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comentario" },
  ],
});

module.exports = mongoose.model("User", userSchema);
