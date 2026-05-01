const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ArticuloBlog = sequelize.define('ArticuloBlog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  autor: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'articulos_blog',
  timestamps: true,
});

module.exports = ArticuloBlog;
