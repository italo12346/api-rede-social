const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conexão com o MongoDB estabelecida com sucesso.");
});

const userRoutes = require("./routes/user");
const fotoRoutes = require("./routes/foto");
const comentarioRoutes = require("./routes/comentario");

app.use("/user", userRoutes);
app.use("/foto", fotoRoutes);
app.use("/comentario", comentarioRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
