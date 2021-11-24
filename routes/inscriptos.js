const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/jwt-validate");

const listaDeInscriptos = [
  {
    nombre: "Yonatan",
    juego: "play",
  },
];

router.post("/", (req, res) => {
  res.send({
    tareas: listaDeInscriptos,
  });
});

router.post("/", verifyToken, (req, res) => {
  const nombre = req.body.nombre;
  const juego = req.body.juego;

  const inscriptoNuevo = {
    nombre: nombre,
    juego,
  };

  listaDeInscriptos.push(nuevaInscripto);

  res.send({
    tareas: listaDeInscriptos,
    inscripto: inscriptoNuevo,
  });
});

module.exports = {
  router: router,
  listaDeInscriptos: listaDeInscriptos,
};