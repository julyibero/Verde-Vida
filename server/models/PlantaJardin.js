const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PlantaJardin = sequelize.define('PlantaJardin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  espacio: {
    type: DataTypes.ENUM('Balcon', 'Sala', 'Terraza', 'Cocina', 'Dormitorio', 'Jardin', 'Otro'),
    defaultValue: 'Sala',
  },
  estado: {
    type: DataTypes.ENUM('Saludable', 'Regular', 'Enferma', 'Fallecida'),
    defaultValue: 'Saludable',
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'plantas_jardin',
  timestamps: true,
});

module.exports = PlantaJardin;
