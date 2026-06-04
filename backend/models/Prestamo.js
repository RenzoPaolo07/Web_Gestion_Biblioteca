const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const crypto = require('crypto');

const Prestamo = sequelize.define('Prestamo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  codigo: { type: DataTypes.STRING, unique: true },
  usuario_id: DataTypes.INTEGER,
  libro_id: DataTypes.INTEGER,
  fecha_prestamo: DataTypes.DATE,
  fecha_devolucion: DataTypes.DATE,
  estado: { type: DataTypes.ENUM('pendiente', 'prestado', 'devuelto'), defaultValue: 'pendiente' }
});

Prestamo.beforeCreate(async (prestamo) => {
  prestamo.codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
});

module.exports = Prestamo;