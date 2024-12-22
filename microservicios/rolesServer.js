const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/config');
const rolRoutes = require('../src/routes/rol/rolesRoutes');

require('../src/models/asociaciones/associations');

const app = express();
const PORT = 8094; // Puerto exclusivo para este microservicio

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', rolRoutes);

// Inicializar base de datos y datos predeterminados
sequelize.sync()
    .then(async () => {
        console.log('Base de datos sincronizada en el microservicio de roles.');
    })
    .catch(err => console.error('Error al sincronizar DB:', err));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Microservicio de Roles corriendo en el puerto ${PORT}`);
});
