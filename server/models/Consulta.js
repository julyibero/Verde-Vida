const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Consulta = sequelize.define('Consulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('diagnostico', 'asesoria', 'diseno'),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_proceso', 'respondida', 'cerrada'),
    defaultValue: 'pendiente',
  },
  respuesta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'consultas',
  timestamps: true,
});

module.exports = Consulta;
