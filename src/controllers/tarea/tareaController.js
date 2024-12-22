const { response } = require('express');
const Tarea = require('../../models/tarea/tareaModel');
const Proyecto = require('../../models/proyecto/proyectoModel');
const Usuario = require('../../models/usuario/usuarioModel');

// Obtener todas las tareas
const getTareas = async (req, res = response) => {
  try {
    const tareas = await Tarea.findAll({
      include: [
        { model: Proyecto, attributes: ['id_proyecto', 'nombre_proyecto'] },
        { model: Usuario, attributes: ['id_usuario', 'nombre_usuario'] },
      ],
    });
    res.json({ tareas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

// Obtener una tarea por ID
const getTareaById = async (req, res = response) => {
  const { id_usuario } = req.params;
  try {
    const tarea = await Tarea.findByPk(id_usuario, {
      include: [
        { model: Proyecto, attributes: ['id_proyecto', 'nombre_proyecto'] },
        { model: Usuario, attributes: ['id_usuario', 'nombre_usuario'] },
      ],
    });

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// Crear una nueva tarea
const createTarea = async (req, res = response) => {
  const { titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto } = req.body;
  try {
    const nuevaTarea = await Tarea.create({ titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto });
    res.status(201).json({ tarea: nuevaTarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Actualizar una tarea
const updateTarea = async (req, res = response) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto } = req.body;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.update({ titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto });
    res.json({ tarea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
const deleteTarea = async (req, res = response) => {
  const { id_tarea } = req.params;

  try {
    const tarea = await Tarea.findByPk(id_tarea);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  getTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea,
};
