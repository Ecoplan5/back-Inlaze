const { Router } = require('express');
const route = Router();

const {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
} = require('../../controllers/tarea/tareaController');
const verificarToken = require('../../../middlewares/vefiricarToken');

// Obtener todas las tareas
route.get('/tareas', verificarToken, getTareas);

// Crear una nueva tarea
route.post('/createTarea', verificarToken, createTarea);

// Obtener una tarea por ID
route.get('/tarea/:id_usuario', verificarToken, getTareaById);

// Modificar una tarea por ID
route.put('/modificarTarea/:id', verificarToken, updateTarea);

// Eliminar una tarea por ID
route.delete('/eliminar/:id_tarea', verificarToken, deleteTarea);

module.exports = route;
