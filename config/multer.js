const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Foto = require("../models/Foto");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
