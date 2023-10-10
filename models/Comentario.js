// models/Comentario.js
const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  conteudo: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foto: { type: mongoose.Schema.Types.ObjectId, ref: "Foto" },
});

module.exports = mongoose.model("Comentario", comentarioSchema);
