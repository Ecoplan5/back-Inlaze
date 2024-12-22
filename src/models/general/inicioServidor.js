const bcrypt = require('bcrypt');
const Rol = require('../../models/rol/rolesModel');
const Usuario = require('../../models/usuario/usuarioModel');

const initializeDatabase = async () => {
    try {
        const cantidadRoles = await Rol.count();
        if (cantidadRoles === 0) {
            await Rol.bulkCreate([
                { nombre_rol: 'SuperAdmin', estado: 'Activo' },
                { nombre_rol: 'Miembro', estado: 'Activo' },
            ]);
            console.log('Se han creado los roles por defecto.');
        }

        const cantidadUsuarios = await Usuario.count();
        if (cantidadUsuarios === 0) {
            const contrasenaEncriptada = await bcrypt.hash('12345678', 10);
            await Usuario.create({
                id_usuario: 1,
                id_rol: 1,
                nombre_usuario: 'Admin',
                contrasena: contrasenaEncriptada,
                correo: 'ecoplan38@gmail.com',
                estado: 'Activo',
            });
            console.log('Se ha creado el usuario por defecto.');
        }
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};

module.exports = { initializeDatabase };
