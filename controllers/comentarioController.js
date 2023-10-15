// controllers/comentarioController.js
const Comentario = require("../models/Comentario");
const Foto = require("../models/Foto"); // Certifique-se de que o caminho para o modelo Foto está correto

// Controlador para criar um novo comentário
exports.createComentario = async (req, res) => {
  try {
    const { conteudo, autorId, fotoId } = req.body;

    // Encontre a foto com base no ID
    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ error: 'Foto não encontrada.' });
    }

    // Crie um novo comentário
    const novoComentario = {
      conteudo,
      autor: autorId,
    };

    // Adicione o comentário ao array de comentários da foto
    foto.comentarios.push(novoComentario);
    
    await foto.save();

    res.json(novoComentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao postar o comentário.' });
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

// Controlador para buscar um comentário por ID
exports.getComentarioById = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const comentario = await Comentario.findById(comentarioId);

    if (!comentario) {
      return res.status(404).json({ error: "Comentário não encontrado." });
    }

    res.json(comentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar o comentário." });
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
