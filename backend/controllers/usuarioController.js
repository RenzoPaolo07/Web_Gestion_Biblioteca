const Usuario = require('../models/Usuario');

exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll({ attributes: { exclude: ['password'] } });
  res.json(usuarios);
};

exports.getUsuarioById = async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.updateUsuario = async (req, res) => {
  const { nombre, email, rol } = req.body;
  await Usuario.update({ nombre, email, rol }, { where: { id: req.params.id } });
  res.json({ message: 'Usuario actualizado' });
};

exports.deleteUsuario = async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Usuario eliminado' });
};