const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/config');
const tareaRoutes = require('../src/routes/tarea/tareaRoutes');

require('../src/models/asociaciones/associations'); 

const app = express();
const PORT = 8093; // Puerto exclusivo para este microservicio

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', tareaRoutes);

// Inicializar base de datos y datos predeterminados
sequelize.sync()
    .then(async () => {
        console.log('Base de datos sincronizada en el microservicio de tareas.');
    })
    .catch(err => console.error('Error al sincronizar DB:', err));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Microservicio de Roles tareas en el puerto ${PORT}`);
});
