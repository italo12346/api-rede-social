// controllers/fotoController.js
const Foto = require("../models/Foto");
const User = require("../models/User");
const Comentario = require("../models/Comentario")

// Controlador para criar uma nova foto
exports.createFoto = async (req, res) => {
  try {
    const autorId = req.user.id;
    const { descricao } = req.body;
    const imagem = req.file.filename;
    
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
      select: 'usuario fotoPerfil',
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


//Controlador para listar as fotos de um usuário
exports.listFotosDoUsuario = async (req, res) => {
  try {
    const userId = req.params.id;

    const fotosDoUsuario = await Foto.find({ autor: userId }).populate({
      path: 'autor',
      select: 'usuario fotoPerfil',
    }).populate({
      path: 'comentarios',
      select: 'autor conteudo',
    });

    res.json(fotosDoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar as fotos do usuário.' });
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

// Controlador para atualizar a descrição de uma foto por ID
exports.updateFotoById = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const { descricao } = req.body; 

    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada." });
    }

    if (foto.autor.toString() !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para atualizar esta foto." });
    }

    foto.descricao = descricao;
    const fotoAtualizada = await foto.save();

    res.json(fotoAtualizada);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar a descrição da foto." });
  }
};

// Controlador para excluir uma foto por ID
exports.deleteFotoById = async (req, res) => {
  try {
    const fotoId = req.params.id;
    const foto = await Foto.findById(fotoId);

    if (!foto) {
      return res.status(404).json({ error: "Foto não encontrada." });
    }

    if (foto.autor.toString() !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para excluir esta foto." });
    }

    await Comentario.deleteMany({ foto: fotoId });

    await User.findByIdAndUpdate(foto.autor, {
      $pull: { fotosPublicadas: fotoId },
    });

    await foto.deleteOne({ _id: fotoId });

    res.json({ message: "Foto excluída com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir a foto." });
  }
};
