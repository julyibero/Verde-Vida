const { sequelize } = require('../config/database');

const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Jardin = require('./Jardin');
const PlantaJardin = require('./PlantaJardin');
const Recordatorio = require('./Recordatorio');
const Consulta = require('./Consulta');
const ImagenConsulta = require('./ImagenConsulta');
const ArticuloBlog = require('./ArticuloBlog');

// Relaciones
Usuario.hasMany(Jardin, { foreignKey: 'usuarioId', as: 'jardines' });
Jardin.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Jardin.hasMany(PlantaJardin, { foreignKey: 'jardinId', as: 'plantas' });
PlantaJardin.belongsTo(Jardin, { foreignKey: 'jardinId', as: 'jardin' });

PlantaJardin.hasMany(Recordatorio, { foreignKey: 'plantaId', as: 'recordatorios' });
Recordatorio.belongsTo(PlantaJardin, { foreignKey: 'plantaId', as: 'planta' });

Categoria.hasMany(Producto, { foreignKey: 'categoriaId', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

Usuario.hasMany(Consulta, { foreignKey: 'usuarioId', as: 'consultas' });
Consulta.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Consulta.hasMany(ImagenConsulta, { foreignKey: 'consultaId', as: 'imagenes' });
ImagenConsulta.belongsTo(Consulta, { foreignKey: 'consultaId', as: 'consulta' });

const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error.message);
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  Usuario,
  Categoria,
  Producto,
  Jardin,
  PlantaJardin,
  Recordatorio,
  Consulta,
  ImagenConsulta,
  ArticuloBlog,
};
