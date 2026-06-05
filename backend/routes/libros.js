const express = require('express');
const { getLibros, getLibroById, createLibro, updateLibro, deleteLibro } = require('../controllers/libroController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', verifyToken, getLibros);
router.get('/:id', verifyToken, getLibroById);
router.post('/', verifyToken, isAdmin, createLibro);
router.put('/:id', verifyToken, isAdmin, updateLibro);
router.delete('/:id', verifyToken, isAdmin, deleteLibro);

module.exports = router;