require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Importar modelos para que Sequelize los conozca
const Usuario = require('./models/Usuario');
const Libro = require('./models/Libro');
const Prestamo = require('./models/Prestamo');

// Establecer relaciones
Usuario.hasMany(Prestamo, { foreignKey: 'usuario_id' });
Prestamo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Libro.hasMany(Prestamo, { foreignKey: 'libro_id' });
Prestamo.belongsTo(Libro, { foreignKey: 'libro_id' });

// Importar rutas
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const libroRoutes = require('./routes/libros');
const prestamoRoutes = require('./routes/prestamos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);

// Sincronizar BD
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada');
});

module.exports = app;