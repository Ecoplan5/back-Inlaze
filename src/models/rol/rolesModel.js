const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');

const Rol = sequelize.define('Rol', { // Cambié el nombre del modelo a singular y PascalCase
  id_rol: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Los nombres de roles deben ser únicos
  },
  
});

module.exports = Rol;
