const { Router } = require('express');
const route = Router();
const verificarToken = require('../../../middlewares/vefiricarToken');


const {
  getProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} = require('../../controllers/proyecto/proyectoController');

// Obtener todos los proyectos
route.get('/proyectos', verificarToken, getProyectos);

// Crear un nuevo proyecto
route.post('/createProyecto', verificarToken, createProyecto);

// Obtener un proyecto por ID
route.get('/proyecto/:id_usuario', verificarToken,  getProyectoById);

// Modificar un proyecto por ID
route.put('/modificar/:id_proyecto', verificarToken, updateProyecto);

// Eliminar un proyecto por ID
route.delete('/proyectos/:id_proyecto', verificarToken, deleteProyecto);

module.exports = route;
