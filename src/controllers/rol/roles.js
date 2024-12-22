const { response } = require('express');
const Rol = require('../../models/rol/rolesModel');

// Obtener todos los roles
const getRoles = async (req, res = response) => {
  try {
    const roles = await Rol.findAll();
    res.json({ roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
};

// Obtener un rol por ID
const getRolById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    res.json({ rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

// Crear un nuevo rol
const createRol = async (req, res = response) => {
  const { nombre_rol } = req.body;
  try {
    const nuevoRol = await Rol.create({ nombre_rol });
    res.status(201).json({ rol: nuevoRol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

// Actualizar un rol
const updateRol = async (req, res = response) => {
  const { id } = req.params;
  const { nombre_rol } = req.body;

  try {
    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    await rol.update({ nombre_rol });
    res.json({ rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

// Eliminar un rol
const deleteRol = async (req, res = response) => {
  const { id } = req.params;

  try {
    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    await rol.destroy();
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};

module.exports = {
  getRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
};
