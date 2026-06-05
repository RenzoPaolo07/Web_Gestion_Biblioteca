const Libro = require('../models/Libro');
const { Op } = require('sequelize');

exports.getLibros = async (req, res) => {
    try {
        const { titulo } = req.query;
        const where = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : {};
        const libros = await Libro.findAll({ where });
        res.json(libros || []);
    } catch (error) {
        console.error('Error en getLibros:', error);
        res.status(500).json([]);
    }
};

exports.getLibroById = async (req, res) => {
    try {
        const libro = await Libro.findByPk(req.params.id);
        if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLibro = async (req, res) => {
    try {
        const libro = await Libro.create(req.body);
        res.status(201).json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLibro = async (req, res) => {
    try {
        await Libro.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Libro actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLibro = async (req, res) => {
    try {
        await Libro.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Libro eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};