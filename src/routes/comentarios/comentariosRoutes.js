const { Router } = require('express');
const route = Router();

const {
  getComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
} = require('../../controllers/comentarios/comentariosController');
const verificarToken = require('../../../middlewares/vefiricarToken');

// Obtener todos los comentarios
route.get('/comentarios/:id_tarea', verificarToken,  getComentarios);

// Crear un nuevo comentario
route.post('/createComentario', verificarToken, createComentario);

// Obtener un comentario por ID
route.get('/comentario/tarea/:id_tarea', verificarToken, getComentarioById);

// Modificar un comentario por ID
route.put('/modificarComentario/:id_comentario', verificarToken, updateComentario);

// Eliminar un comentario por ID
route.delete('/comentarios/:id_comentario', verificarToken, deleteComentario);

module.exports = route;
