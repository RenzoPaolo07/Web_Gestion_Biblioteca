const express = require('express');
const { solicitarPrestamo, getMisPrestamos, getAllPrestamos, aprobarPrestamo, registrarDevolucion } = require('../controllers/prestamoController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.post('/', verifyToken, solicitarPrestamo);
router.get('/mis-prestamos', verifyToken, getMisPrestamos);
router.get('/todos', verifyToken, isAdmin, getAllPrestamos);
router.put('/:id/aprobar', verifyToken, isAdmin, aprobarPrestamo);
router.put('/:id/devolver', verifyToken, isAdmin, registrarDevolucion);

module.exports = router;