const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, verifyToken } = require("../middlewares/jwt-validate");
const db = require("../db");
const { listaDeTareas } = require("./inscriptos");

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ success: true });
});

router.post("/registro", async (req, res) => {
  if (req.body.mail && req.body.name && req.body.password) {
    // Formato del mail
    if (/^\S+@\S+\.\S+$/.test(req.body.mail) === false) {
      res
        .status(400)
        .json({ success: false, message: "Formato de mail incorrecto" });
      return;
    }

    const usuarioBd = await db.query(
      "Select * from users where mail = $1",
       [req.body.mail]
    );

    const existeUser = usuarioBd.rowCount > 0;



    if (existeUser) {
      res.status(400).json({ success: false, message: "Mail repetido" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    console.log("Salt", salt);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      mail: req.body.mail,
      password: password,
    };

    await db.query(
      "Insert into users(name, mail, password) values ($1, $2, $3)",
      [newUser.name, newUser.mail, newUser.password]
    );

    usuarios.push(newUser);

    return res.status(200).json({ success: true, newUser });
  } else {
    return res.status(400).json({
      success: false,
      message: "Faltan datos (requeridos: mail, name, password)",
    });
  }
});

router.post("/login", async (req, res) => {
  const user = usuarios.find((u) => u.mail === req.body.mail);
  if (!user) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña no válida" });
  }

  // Crear el token
  const token = jwt.sign(
    {
      name: user.name,
      mail: user.mail,
    },
    TOKEN_SECRET
  );

  console.log("Login en auth, listaDeTareas", listaDeTareas);
  res.status(200).json({
    error: null,
    data: "Login exitoso",
    token,
  });
});


router.get("/usuarios", async (req, res) => {
  const users = await db.query("Select * from users");
  const result = users.rows;
  res.json({ error: null, result });
});

module.exports = router;

const usuarios = [
  {
    name: "Yonatan",
    mail: "yonatan@curso.com",
    password: "miPass",
  },
];