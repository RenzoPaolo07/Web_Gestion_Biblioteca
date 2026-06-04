const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.userId = decoded.id;
    req.userRol = decoded.rol;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userRol !== 'admin') return res.status(403).json({ message: 'Acceso solo para admin' });
  next();
};