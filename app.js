const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/user", userRoutes);
app.use("/foto", fotoRoutes);
app.use("/comentario", comentarioRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
