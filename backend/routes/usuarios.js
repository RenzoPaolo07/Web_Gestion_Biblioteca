const express = require('express');
const { getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', verifyToken, isAdmin, getUsuarios);
router.get('/:id', verifyToken, isAdmin, getUsuarioById);
router.put('/:id', verifyToken, isAdmin, updateUsuario);
router.delete('/:id', verifyToken, isAdmin, deleteUsuario);

module.exports = router;