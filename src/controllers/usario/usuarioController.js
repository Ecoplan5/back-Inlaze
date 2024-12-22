const Usuario = require('../../models/usuario/usuarioModel');
const Rol = require('../../models/rol/rolesModel');

const { response } = require('express');
const bcrypt = require('bcrypt');



const getUsuarios = async (req, res = response) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{
                model: Rol,
                as: 'Rol',
                attributes: ['nombre_rol'],
            }],
        });

        // Devuelve los usuarios con su rol asociado
        res.json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};




const getUsuarioByd = async (req, res = response) => {
    const { id_usuario } = req.params;

    try {
        const usuario = await Usuario.findByPk(id_usuario, {
            include: [{
                model: Rol,
                as: 'Rol',  // Asegúrate de usar el alias correcto aquí
                attributes: ['nombre_rol'],
            }],
        });

        console.log('Usuario encontrado:', usuario);

        if (!usuario) {
            return res.status(404).json({ error: `No se encontró el usuario con ID ${id_usuario}` });
        }

        res.json({ usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};


const postUsuario = async (req, res = response) => {
    const { id_rol, nombre_usuario, contrasena, correo } = req.body;
    console.log(req.body);  // Verifica que id_rol esté presente

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        console.log('Usuario encontrado:', usuarioExistente);

        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                error: 'El correo electrónico ya está en uso.'
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            id_rol,
            nombre_usuario,
            contrasena: contrasenaEncriptada,
            correo,
        });

        res.status(201).json({
            success: true,
            message: 'Usuario creado con éxito.',
            usuario: nuevoUsuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Error al crear el usuario.'
        });
    }
};




const putUsuario = async (req, res = response) => {
    const { id_usuario } = req.params;
    const updatedData = req.body;

    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            return res
                .status(404)
                .json({ error: `No se encontró un elemento de Usuario con ID ${id_usuario}` });
        }

        await usuario.update(updatedData);
        res.json({ mensaje: `El elemento de Usuario fue actualizado exitosamente.` });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Error al actualizar el elemento de Usuario" });
    }
};


const deleteUsuario = async (req, res = response) => {
    const { id_usuario } = req.params;

    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (usuario) {
            await usuario.destroy();
            res.json("Elemento de Usuario eliminado exitosamente");
        } else {
            res
                .status(404)
                .json({ error: `  No se encontró un elemento de usuario con ID ${id_usuario}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: " Error al eliminar el elemento de usuario" });
    }
};




const actualizarEstadoUsuario = async (req, res = response) => {
    const { id_usuario } = req.params;
    const { estado } = req.body;

    try {
        const usuario = await Usuario.findByPk(id_usuario);

        if (usuario) {
            usuario.estado = estado;
            await usuario.save();

            res.json({ mensaje: "Estado de usuario actualizado correctamente" });
        } else {
            res.status(404).json({ error: `No se encontró un usuario con ID ${id_usuario}` });
        }
    } catch (error) {
        console.error("Error al actualizar estado de usuario:", error);
        res.status(500).json({ error: "Error al actualizar estado de usuario" });
    }
};

module.exports = {
    getUsuarioByd,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
    actualizarEstadoUsuario,
};
