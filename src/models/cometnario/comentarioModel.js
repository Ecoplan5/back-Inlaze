const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');
const Usuario = require('../usuario/usuarioModel');
const Tarea = require('../tarea/tareaModel');

const Comentario = sequelize.define('comentarios', {
  id_comentario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tarea: {
    type: DataTypes.INTEGER,
    allowNull: false, // Asegura que siempre tenga una tarea asociada
  },
});

Comentario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Comentario.belongsTo(Tarea, { 
  foreignKey: 'id_tarea',
  onDelete: 'CASCADE', // Al eliminar una tarea, elimina también los comentarios relacionados
});

Tarea.hasMany(Comentario, {
  foreignKey: 'id_tarea',
  onDelete: 'CASCADE', // Propagación del borrado desde Tarea a Comentario
});

module.exports = Comentario;
