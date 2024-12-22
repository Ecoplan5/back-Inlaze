const { Router } = require('express');
const route = Router();
const verificarToken = require('../../../middlewares/vefiricarToken')
const { getUsuarioByd,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
    actualizarEstadoUsuario, } = require('../../controllers/usario/usuarioController');

route.get('/usuarios', verificarToken, getUsuarios );

route.post('/createUsuario', postUsuario  );

route.get('/usuario/:id_usuario',verificarToken, getUsuarioByd);

route.put('/modificar/:id_usuario', verificarToken, putUsuario, );

route.delete('/usuarios/:id_usuario', verificarToken, deleteUsuario);
route.put('/:id/estado',verificarToken,  actualizarEstadoUsuario ) ;

module.exports = route;
