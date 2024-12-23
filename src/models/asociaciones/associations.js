// src/models/associations.js
const Proyecto = require('../proyecto/proyectoModel');
const Tarea = require('../tarea/tareaModel');
const Usuario = require('../usuario/usuarioModel');
const UsuarioTarea = require('../usuarioTareaModel/usuarioTareaModel');

// Relación de Proyecto con Usuario
Proyecto.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Relación de Proyecto con Tarea
Proyecto.hasMany(Tarea, { foreignKey: 'id_proyecto' });

// Relación de Tarea con Proyecto
Tarea.belongsTo(Proyecto, { foreignKey: 'id_proyecto' });

// Relación de Tarea con Usuario
Tarea.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Relación muchos a muchos entre Tarea y Usuario
Tarea.belongsToMany(Usuario, { through: UsuarioTarea, foreignKey: 'id_tarea', otherKey: 'id_usuario' });
Usuario.belongsToMany(Tarea, { through: UsuarioTarea, foreignKey: 'id_usuario', otherKey: 'id_tarea' });
module.exports = { Proyecto, Tarea, Usuario,UsuarioTarea };
