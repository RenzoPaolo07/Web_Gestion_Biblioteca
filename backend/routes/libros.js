const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");


// GET todos los libros
router.get("/", async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});


// POST crear libro
router.post("/", async (req, res) => {
  const nuevoLibro = new Libro(req.body);
  await nuevoLibro.save();
  res.json(nuevoLibro);
});


// DELETE libro
router.delete("/:id", async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Libro eliminado" });
});

module.exports = router;
