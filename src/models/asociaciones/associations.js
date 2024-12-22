// src/models/associations.js
const Proyecto = require('../proyecto/proyectoModel');
const Tarea = require('../tarea/tareaModel');
const Usuario = require('../usuario/usuarioModel');

// Relación de Proyecto con Usuario
Proyecto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Relación de Proyecto con Tarea
Proyecto.hasMany(Tarea, { foreignKey: 'id_proyecto' });

// Relación de Tarea con Proyecto
Tarea.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

// Relación de Tarea con Usuario
Tarea.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = { Proyecto, Tarea, Usuario };
