require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');

// IMPORTAR MODELOS
const Usuario = require('./models/Usuario');
const Libro = require('./models/Libro');
const Prestamo = require('./models/Prestamo');

// VERIFICAR QUE LOS MODELOS EXISTEN
console.log('✅ Modelos cargados:');
console.log('- Usuario:', typeof Usuario);
console.log('- Libro:', typeof Libro);
console.log('- Prestamo:', typeof Prestamo);

// DEFINIR RELACIONES (SOLO SI LOS MODELOS EXISTEN)
if (Usuario && typeof Usuario.hasMany === 'function') {
    Usuario.hasMany(Prestamo, { foreignKey: 'usuario_id' });
    Prestamo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
    console.log('✅ Relación Usuario-Prestamo establecida');
}

if (Libro && typeof Libro.hasMany === 'function') {
    Libro.hasMany(Prestamo, { foreignKey: 'libro_id' });
    Prestamo.belongsTo(Libro, { foreignKey: 'libro_id' });
    console.log('✅ Relación Libro-Prestamo establecida');
}

// IMPORTAR RUTAS
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const libroRoutes = require('./routes/libros');
const prestamoRoutes = require('./routes/prestamos');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// RUTAS API
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/libros', libroRoutes);
app.use('/prestamos', prestamoRoutes);

// SINCRONIZAR BD
sequelize.sync({ alter: true })
    .then(() => console.log('✅ Base de datos sincronizada'))
    .catch(err => console.error('❌ Error:', err));

module.exports = app;