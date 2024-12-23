const { response } = require('express');
const Tarea = require('../../models/tarea/tareaModel');
const Proyecto = require('../../models/proyecto/proyectoModel');
const Usuario = require('../../models/usuario/usuarioModel');
const UsuarioTarea = require('../../models/usuarioTareaModel/usuarioTareaModel');

// Obtener todas las tareas
const { sequelize } = require('../../../database/config');

const getTareas = async (req, res = response) => {
  try {
    // Realiza una consulta SQL personalizada
    const tareas = await sequelize.query(
      `
      SELECT 
        T.id_tarea, 
        T.titulo, 
        T.descripcion, 
        T.fecha_limite, 
        T.estado, 
        p.id_proyecto,
        P.nombre_proyecto, 
        U.id_usuario, 
        U.nombre_usuario
      FROM Tareas AS T
      INNER JOIN Proyectos AS P ON T.id_proyecto = P.id_proyecto
      LEFT JOIN UsuarioTarea AS UT ON T.id_tarea = UT.id_tarea
      LEFT JOIN Usuarios AS U ON UT.id_usuario = U.id_usuario
      ORDER BY T.id_tarea, U.id_usuario;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    const tareasAgrupadas = tareas.reduce((acc, tarea) => {
      const tareaExistente = acc.find(t => t.id_tarea === tarea.id_tarea);

      if (tareaExistente) {
        // Si la tarea ya está en el resultado, añade el usuario
        tareaExistente.usuarios.push({
          id_usuario: tarea.id_usuario,
          nombre_usuario: tarea.nombre_usuario,
        });
      } else {
        // Si la tarea no está en el resultado, añádela con el usuario inicial
        acc.push({
          id_tarea: tarea.id_tarea,
          titulo: tarea.titulo,
          descripcion: tarea.descripcion,
          fecha_limite: tarea.fecha_limite,
          estado: tarea.estado,
          id_proyecto: tarea.id_proyecto,
          nombre_proyecto: tarea.nombre_proyecto,
          usuarios: tarea.id_usuario
            ? [{ id_usuario: tarea.id_usuario, nombre_usuario: tarea.nombre_usuario }]
            : [],
        });
      }

      return acc;
    }, []);

    res.json({ tareas: tareasAgrupadas });
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

const createTarea = async (req, res = response) => {
  const { titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto, usuarios } = req.body;

  try {
    // Crear la tarea
    const nuevaTarea = await Tarea.create({ titulo, descripcion, fecha_limite, estado, id_usuario, id_proyecto });

    // Excluir al administrador (id_usuario = 1)
    const usuariosFiltrados = usuarios.filter(id => id !== 1);

    // Asignar usuarios a la tarea
    await UsuarioTarea.bulkCreate(
      usuariosFiltrados.map(id_usuario => ({ id_tarea: nuevaTarea.id_tarea, id_usuario }))
    );

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
