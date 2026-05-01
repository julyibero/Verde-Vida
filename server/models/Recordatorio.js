const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Recordatorio = sequelize.define('Recordatorio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.ENUM('riego', 'abono', 'poda', 'trasplante'),
    allowNull: false,
  },
  frecuenciaDias: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 7,
  },
  ultimaFecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  proximaFecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'recordatorios',
  timestamps: true,
});

module.exports = Recordatorio;
