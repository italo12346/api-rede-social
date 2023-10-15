// models/Foto.js
const mongoose = require("mongoose");

const fotoSchema = new mongoose.Schema({
  imagem: String,
  data: { type: Date, default: Date.now },
  descricao: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comentarios: [{
    conteudo: String,
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
});

module.exports = mongoose.model("Foto", fotoSchema);
