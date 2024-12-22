const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/config');
const Rol = require('../rol/rolesModel');

const Usuario = sequelize.define('Usuario', { 
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // No puede haber correos duplicados
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false, // Debería almacenarse encriptada
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Activo por defecto
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false, // Cada usuario debe tener un rol
    references: {
      model: Rol,
      key: 'id_rol',
    },
  },
}, {
  timestamps: true, // Para createdAt y updatedAt
});

// Define las relaciones explícitamente
Usuario.belongsTo(Rol, { foreignKey: 'id_rol', as: 'Rol' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol', as: 'Usuarios' });

module.exports = Usuario;
