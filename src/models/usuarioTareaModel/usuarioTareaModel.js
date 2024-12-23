const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');

const UsuarioTarea = sequelize.define('UsuarioTarea', {
    id_usuario_tarea: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_tarea: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'UsuarioTarea', // Verifica que el nombre coincide con la base de datos
    timestamps: false, // No usar createdAt y updatedAt
  });
  


module.exports = UsuarioTarea;



