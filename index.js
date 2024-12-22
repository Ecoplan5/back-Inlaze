require('dotenv').config();

// Importar microservicios
const startComentariosService = require('./microservicios/comentarioServer');
const startProyectosService = require('./microservicios/proyectoServer');
const startUsuariosService = require('./microservicios/usuariosServer');
const startTareasService = require('./microservicios/tareaServer');
const startInicioSesionService = require('./microservicios/inicioSesionServer');
const startRolesService = require('./microservicios/rolesServer');


// Iniciar los microservicios
(async () => {
    try {
        console.log('Iniciando microservicios...');

        // Llamar a las funciones de inicio de cada microservicio
        await Promise.all([
            startComentariosService(),
            startProyectosService(),
            startUsuariosService(),
            startTareasService(),
            startInicioSesionService(),
            startRolesService(),

        ]);

        console.log('Todos los microservicios están corriendo.');
    } catch (error) {
        console.error('Error al iniciar los microservicios:', error);
    }
})();

