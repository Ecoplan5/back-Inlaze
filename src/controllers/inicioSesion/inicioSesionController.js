const jwt = require('jsonwebtoken');
const { sequelize } = require('../../../database/config'); 
const Usuario = require('../../models/usuario/usuarioModel');
const Rol = require('../../models/rol/rolesModel');
const { response } = require('express');
const bcrypt = require('bcrypt');

async function inicioSesion(req, res = response) {
    const { nombre_usuario, contrasena } = req.body;
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');

        const usuarioEncontrado = await Usuario.findOne({
            where: { nombre_usuario },
            include: {
              model: Rol,
              as: 'Rol', // Alias definido en el modelo
              attributes: ['id_rol', ], // Asegúrate de incluir todas las columnas necesarias
            },
        });

        if (!usuarioEncontrado) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
        }

        if (!usuarioEncontrado.Rol) {
            return res.status(500).json({ mensaje: 'El usuario no tiene un rol asociado.' });
        }

        const contraseñaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
        if (!contraseñaValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        if (usuarioEncontrado.estado === 'Inactivo') {
            return res.status(403).json({ mensaje: 'Usuario inactivo, no puede iniciar sesión' });
        }

        let mensaje;
        if (usuarioEncontrado.Rol.nombre_rol === "Administrador") {
            mensaje = 'No puedes inactivar tu Cuenta de Super Admin';
        } else if (usuarioEncontrado.Rol.nombre_rol === "miembro") { // Corrige el typo aquí
            mensaje = 'Cuenta de miembro';
        }

        const usuarioFormateado = {
            id_usuario: usuarioEncontrado.id_usuario,
            nombre_usuario: usuarioEncontrado.nombre_usuario,
            rol: {
                id_rol: usuarioEncontrado.Rol.id_rol,
                nombre: usuarioEncontrado.Rol.nombre_rol,
                estado: usuarioEncontrado.Rol.estado,
            },
            correo: usuarioEncontrado.correo,
            created_at: usuarioEncontrado.created_at,
            updated_at: usuarioEncontrado.updated_at,
            estado: usuarioEncontrado.estado,
        };

        const token = generarToken(usuarioFormateado);
        res.json({
            token,
            usuario: usuarioFormateado,
            mensaje,
        });

    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

function generarToken(usuario) {
    const { id_usuario, nombre_usuario } = usuario;
    return jwt.sign({ nombre_usuario, userId: id_usuario }, 'secreto-seguro', { expiresIn: '24h' });
}

module.exports = {
    inicioSesion,
    generarToken,
};
