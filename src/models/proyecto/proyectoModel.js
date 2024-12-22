const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');

const Proyecto = sequelize.define('Proyecto', {
  id_proyecto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_proyecto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Proyecto;
