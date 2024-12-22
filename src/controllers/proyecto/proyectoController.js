const { response } = require('express');
const Proyecto = require('../../models/proyecto/proyectoModel');
const Usuario = require('../../models/usuario/usuarioModel');
const Tarea = require ('../../models/tarea/tareaModel')
// Obtener todos los proyectos
const getProyectos = async (req, res = response) => {
  try {
    const proyectos = await Proyecto.findAll({
      include: [
        { 
          model: Usuario, 
          attributes: [ 'nombre_usuario'] 
        },
        {
          model: Tarea, // Incluir las tareas asociadas
          attributes: ['id_tarea', 'titulo', 'descripcion', 'fecha_limite', 'estado'], // Seleccionar los campos necesarios
        },
      ],
    });

    res.json({ proyectos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
};


const getProyectoById = async (req, res = response) => {
  const { id_usuario } = req.params;

  try {
    const proyecto = await Proyecto.findByPk(id_usuario, {
      include: [
        { 
          model: Usuario, 
          attributes: ['nombre_usuario'] 
        },
        {
          model: Tarea, // Incluir las tareas asociadas
          attributes: ['id_tarea', 'titulo', 'descripcion', 'fecha_limite', 'estado'], // Seleccionar los campos necesarios
        },
      ],
    });

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({ proyecto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

// Crear un nuevo proyecto
const createProyecto = async (req, res = response) => {
  const { nombre_proyecto, descripcion, id_usuario, estado } = req.body;

  try {
    const nuevoProyecto = await Proyecto.create({
      nombre_proyecto,
      descripcion,
      id_usuario,
      estado,
    });

    // Devolver directamente el proyecto recién creado
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};


// Actualizar un proyecto
const updateProyecto = async (req, res = response) => {
  const { id_proyecto } = req.params;
  const { nombre_proyecto, descripcion, id_usuario, estado } = req.body;

  try {
    const proyecto = await Proyecto.findByPk(id_proyecto);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.update({ nombre_proyecto, descripcion, id_usuario, estado });
    res.json({ proyecto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar un proyecto
const deleteProyecto = async (req, res = response) => {
  const { id } = req.params;

  try {
    const proyecto = await Proyecto.findByPk(id);

    if (!proyecto) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await proyecto.destroy();
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};

module.exports = {
  getProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
};
