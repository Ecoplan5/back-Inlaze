const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/config');
const inicioSesionRoutes = require('../src/routes/inicioSesion/inicioSesionRoutes');
const { initializeDatabase } = require('../src/models/general/inicioServidor');

require('../src/models/asociaciones/associations'); 

const app = express();
const PORT = 8091; // Puerto exclusivo para este microservicio

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', inicioSesionRoutes);

// Inicializar base de datos y datos predeterminados
sequelize.sync()
    .then(async () => {
        console.log('Base de datos sincronizada en el microservicio de sesiones.');
        await  initializeDatabase();
    })
    .catch(err => console.error('Error al sincronizar DB:', err));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Microservicio de sesiones corriendo en el puerto ${PORT}`);
});
