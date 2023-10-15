// controllers/userController.js
const User = require("../models/User");

// Controlador para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { nome, usuario, email, senha, fotoPerfil } = req.body;

    const newUser = new User({
      nome,
      usuario,
      email,
      senha,
      fotoPerfil,
    });

    if (!nome || nome.trim() === "") return res.status(422).json({ message: "O nome é obrigatorio." });
    if (!usuario || usuario.trim() === "") return res.status(422).json({ message: "O nome de usuário é obrigatorio." });
    if (!email || email.trim() === "") return res.status(422).json({ message: "O email é obrigatorio." });
    if (!senha || senha.trim() === "") return res.status(422).json({ message: "A senha é obrigatorio." });

    const userExist = await User.findOne({email : email})
    if (userExist) return res.status(422).json({message: "O usuário já está cadastrado com esse email."})

    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
};

// Controlador para listar todos os usuários
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar os usuários." });
  }
};

// Controlador para buscar um usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(user);
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
