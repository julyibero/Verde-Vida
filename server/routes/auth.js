const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'verdevida_secret_dev';

// POST /api/auth/register
router.post(
  '/register',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, email, password } = req.body;

      const existente = await Usuario.findOne({ where: { email } });
      if (existente) {
        return res.status(409).json({ message: 'Ya existe un usuario con ese email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = await Usuario.create({ nombre, email, password: hashedPassword });

      const token = jwt.sign(
        { userId: usuario.id, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
      });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Email o contraseña incorrectos' });
      }

      const token = jwt.sign(
        { userId: usuario.id, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }
);

// GET /api/auth/me
router.get('/me', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.userId, {
      attributes: ['id', 'nombre', 'email', 'rol', 'telefono', 'createdAt'],
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user: usuario });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

module.exports = router;
