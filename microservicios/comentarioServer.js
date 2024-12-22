const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/config');
const comentarioRoutes = require('../src/routes/comentarios/comentariosRoutes');

require('../src/models/asociaciones/associations'); // Asociaciones de modelos

const app = express();
const PORT = 8090; // Puerto exclusivo para este microservicio

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api', comentarioRoutes);

// Inicializar base de datos y datos predeterminados
sequelize.sync()
    .then(async () => {
        console.log('Base de datos sincronizada en el microservicio de comentarios.');
    })
    .catch(err => console.error('Error al sincronizar DB:', err));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Microservicio de Comentarios corriendo en el puerto ${PORT}`);
});
