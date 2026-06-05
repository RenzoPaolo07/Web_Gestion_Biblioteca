const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const crypto = require('crypto');

const Prestamo = sequelize.define('Prestamo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING,
        unique: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    libro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_prestamo: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_devolucion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'prestado', 'devuelto'),
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'prestamos',
    timestamps: true
});

// Generar código único antes de crear
Prestamo.beforeCreate(async (prestamo) => {
    prestamo.codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
});

module.exports = Prestamo;