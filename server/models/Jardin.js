const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Jardin = sequelize.define('Jardin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipoEspacio: {
    type: DataTypes.ENUM('Casa', 'Apartamento', 'Oficina', 'Otro'),
    defaultValue: 'Casa',
  },
  ubicacion: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
}, {
  tableName: 'jardines',
  timestamps: true,
});

module.exports = Jardin;
