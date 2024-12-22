const { Router } = require('express');
const route = Router();
const verificarToken = require('../../../middlewares/vefiricarToken');

const {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
} = require('../../controllers/rol/roles');

// Obtener todos los roles
route.get('/roles', verificarToken, getRoles);

// Crear un nuevo rol
route.post('/createRol', verificarToken, createRol);

// Obtener un rol por ID
route.get('/obtener/:id', verificarToken, getRolById);

// Modificar un rol por ID
route.put('/modificar/:id', verificarToken, updateRol);

// Eliminar un rol por ID
route.delete('/roles/:id', verificarToken,  deleteRol);

module.exports = route;
