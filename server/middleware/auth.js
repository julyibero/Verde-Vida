const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'verdevida_secret_dev';

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRol = decoded.rol;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

function requerirAdmin(req, res, next) {
  if (req.userRol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol administrador' });
  }
  next();
}

module.exports = { verificarToken, requerirAdmin };
