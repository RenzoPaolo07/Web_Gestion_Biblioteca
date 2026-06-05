const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');
const Usuario = require('../models/Usuario');

exports.solicitarPrestamo = async (req, res) => {
  const { libro_id, fecha_devolucion } = req.body;
  const libro = await Libro.findByPk(libro_id);
  if (!libro || libro.cantidad < 1) return res.status(400).json({ message: 'Libro no disponible' });
  const prestamo = await Prestamo.create({
    usuario_id: req.userId,
    libro_id,
    fecha_prestamo: new Date(),
    fecha_devolucion,
    estado: 'pendiente'
  });
  res.status(201).json(prestamo);
};

exports.getMisPrestamos = async (req, res) => {
  const prestamos = await Prestamo.findAll({
    where: { usuario_id: req.userId },
    include: [{ model: Libro, attributes: ['titulo', 'autor'] }]
  });
  res.json(prestamos);
};

exports.getAllPrestamos = async (req, res) => {
  const prestamos = await Prestamo.findAll({
    include: [
      { model: Usuario, attributes: ['nombre', 'email'] },
      { model: Libro, attributes: ['titulo', 'autor'] }
    ]
  });
  res.json(prestamos);
};

exports.aprobarPrestamo = async (req, res) => {
  const prestamo = await Prestamo.findByPk(req.params.id);
  if (!prestamo) return res.status(404).json({ message: 'Préstamo no existe' });
  prestamo.estado = 'prestado';
  await prestamo.save();
  await Libro.decrement('cantidad', { where: { id: prestamo.libro_id } });
  res.json({ message: 'Préstamo aprobado' });
};

exports.registrarDevolucion = async (req, res) => {
  const prestamo = await Prestamo.findByPk(req.params.id);
  if (!prestamo) return res.status(404).json({ message: 'Préstamo no existe' });
  prestamo.estado = 'devuelto';
  await prestamo.save();
  await Libro.increment('cantidad', { where: { id: prestamo.libro_id } });
  res.json({ message: 'Devolución registrada' });
};