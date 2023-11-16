// controllers/userController.js
const User = require("../models/User");
const Foto = require("../models/Foto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controlador para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, usuario, email, senha } = req.body;
    const file = req.file; // Corrigido: atribuição da variável 'file'

    if (!nome || nome.trim() === "") {
      return res.status(422).json({ message: "O nome é obrigatório." });
    }

    if (!usuario || usuario.trim() === "") {
      return res
        .status(422)
        .json({ message: "O nome de usuário é obrigatório." });
    }

    if (!email || email.trim() === "") {
      return res.status(422).json({ message: "O email é obrigatório." });
    }

    if (!senha || senha.trim() === "") {
      return res.status(422).json({ message: "A senha é obrigatória." });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ message: "Já existe um usuário cadastrado com esse email." });
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const newUser = new User({
      nome,
      usuario,
      email,
      senha: senhaHash,
      fotoPerfil: file ? file.path : null, // Corrigido: verificar se 'file' existe
    });

    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
};

// Controlador para login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || email.trim() === "") {
    return res.status(422).json({ message: "O email é obrigatorio." });
  }
  if (!senha || senha.trim() === "") {
    return res.status(422).json({ message: "A senha é obrigatorio." });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    return res.status(422).json({ message: "Senha inválida." });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res
      .status(200)
      .json({ message: "Autenticação realizada com sucesso.", token });
  } catch (err) {
    console.log(err);
  }
};

// Controlador para listar todos os usuários
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id nome usuario fotoPerfil");

    const usersWithPhotoCount = await Promise.all(
      users.map(async (user) => {
        const publicacoes = await Foto.countDocuments({ autor: user._id });
        return { ...user.toObject(), publicacoes };
      })
    );

    res.status(200).json(usersWithPhotoCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar os usuários." });
  }
};

// Controlador para buscar um usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, "-senha")
      .select("-email")
      .select("-fotosPublicadas");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const publicacoes = await Foto.countDocuments({ autor: userId });

    const userWithPhotoCount = { ...user.toObject(), publicacoes };

    res.status(200).json(userWithPhotoCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar o usuário." });
  }
};

// Controlador para atualizar um usuário por ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
};

// Controlador para excluir um usuário por ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir o usuário." });
  }
};
