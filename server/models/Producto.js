const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dificultad: {
    type: DataTypes.ENUM('Facil', 'Intermedio', 'Experto'),
    allowNull: true,
  },
}, {
  tableName: 'productos',
  timestamps: true,
});

module.exports = Producto;
