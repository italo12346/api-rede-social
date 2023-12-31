// controllers/comentarioController.js
const Comentario = require("../models/Comentario");
const Foto = require("../models/Foto");

// Controlador para criar um novo comentário
exports.createComentario = async (req, res) => {
  try {
    const autorId = req.user.id;
    const { conteudo, fotoId } = req.body;

    // Crie um novo comentário
    const novoComentario = new Comentario({
      conteudo,
      autor: autorId,
      foto: fotoId,
    });

    await novoComentario.save();

    // Atualize a foto com o novo comentário
    await Foto.findByIdAndUpdate(fotoId, {
      $push: { comentarios: novoComentario._id },
    });

    res.json(novoComentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao postar o comentário." });
  }
};

// Controlador para listar todos os comentários
exports.listComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find().populate(
      "autor",
      "nome usuario fotoPerfil"
    );

    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar os comentários." });
  }
};

// Controlador para buscar comentários de uma foto
exports.getComentarioById = async (req, res) => {
 try {
    const fotoId = req.params.id;

    const comentarios = await Comentario.find({ foto: fotoId }).populate(
      'autor',
      'usuario fotoPerfil'
    );

    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar os comentários.' });
  }
};

// Controlador para atualizar um comentário por ID
exports.updateComentarioById = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const updatedComentario = req.body;

    const comentario = await Comentario.findByIdAndUpdate(
      comentarioId,
      updatedComentario,
      { new: true }
    );

    if (!comentario) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    res.json(comentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar o comentário." });
  }
};

// Controlador para excluir um comentário por ID
exports.deleteComentarioById = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const comentario = await Comentario.findByIdAndDelete(comentarioId);

    if (!comentario) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    res.json({ message: "Comentário excluído com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir o comentário." });
  }
};
