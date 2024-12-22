const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');

const Tarea = sequelize.define('Tarea', {
  id_tarea: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('por_hacer', 'en_progreso', 'completada'),
    defaultValue: 'por_hacer',
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_proyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Tarea;
