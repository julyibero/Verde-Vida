const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ImagenConsulta = sequelize.define('ImagenConsulta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rutaArchivo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'imagenes_consulta',
  timestamps: true,
});

module.exports = ImagenConsulta;
