// controllers/fotoController.js
const Foto = require("../models/Foto");
const User = require("../models/User");

// Controlador para criar uma nova foto
exports.createFoto = async (req, res) => {
  try {
    const { descricao, autorId } = req.body;
    const  imagem  = req.file.filename

    const novaFoto = new Foto({
      imagem,
      descricao,
      autor: autorId,
    });

    await novaFoto.save();

    // Atualize o perfil do autor com a nova foto
    await User.findByIdAndUpdate(autorId, {
      $push: { fotosPublicadas: novaFoto._id },
    });

    res.status(201).json({ message: "Foto criada com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar a foto." });
  }
};

// Controlador para listar todas as fotos com os conteúdos dos comentários
exports.listFotos = async (req, res) => {
  try {
    const fotos = await Foto.find().populate({
      path: 'autor',
      select: 'nome usuario fotoPerfil',
    }).populate({
      path: 'comentarios',
      select: 'autor conteudo',
    });

    res.json(fotos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar as fotos.' });
  }
};


// Controlador para buscar uma foto por ID
exports.getFotoById = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada." });
    }

    res.json(foto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar a foto." });
  }
};

// Controlador para atualizar uma foto por ID
exports.updateFotoById = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const { descricao } = req.body; // Apenas atualiza a descrição

    const foto = await Foto.findByIdAndUpdate(
      fotoId,
      { descricao }, // Atualiza apenas a descrição
      {
        new: true,
      }
    );

    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada." });
    }

    res.json(foto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar a descrição da foto." });
  }
};

// Controlador para excluir uma foto por ID
exports.deleteFotoById = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const foto = await Foto.findByIdAndDelete(fotoId);

    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada." });
    }

    // Remova a referência da foto no perfil do autor
    await User.findByIdAndUpdate(foto.autor, {
      $pull: { fotosPublicadas: fotoId },
    });

    res.json({ message: "Foto excluída com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir a foto." });
  }
};
