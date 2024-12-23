const { response } = require('express');
const Proyecto = require('../../models/proyecto/proyectoModel');
const Usuario = require('../../models/usuario/usuarioModel');
const Tarea = require ('../../models/tarea/tareaModel')
const { sequelize } = require('../../../database/config');
// Obtener todos los proyectos
const getProyectos = async (req, res = response) => {
  try {
    // Realiza una consulta SQL personalizada para obtener proyectos con tareas y usuarios
    const proyectos = await sequelize.query(
      `
      SELECT 
        P.id_proyecto,
        P.nombre_proyecto,
        P.descripcion,
        U.id_usuario AS id_usuario_creador,
        U.nombre_usuario AS nombre_usuario_creador,
        T.id_tarea,
        T.titulo AS titulo_tarea,
        T.descripcion AS descripcion_tarea,
        T.fecha_limite,
        T.estado,
        UT.id_usuario AS id_usuario_tarea,
        UU.nombre_usuario AS nombre_usuario_tarea
      FROM Proyectos AS P
      INNER JOIN Usuarios AS U ON P.id_usuario = U.id_usuario
      LEFT JOIN Tareas AS T ON T.id_proyecto = P.id_proyecto
      LEFT JOIN UsuarioTarea AS UT ON T.id_tarea = UT.id_tarea
      LEFT JOIN Usuarios AS UU ON UT.id_usuario = UU.id_usuario
      ORDER BY P.id_proyecto, T.id_tarea, UT.id_usuario;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    // Agrupar proyectos, tareas y usuarios
    const proyectosAgrupados = proyectos.reduce((acc, proyecto) => {
      let proyectoExistente = acc.find((p) => p.id_proyecto === proyecto.id_proyecto);

      if (!proyectoExistente) {
        // Si el proyecto no existe, se agrega al resultado
        proyectoExistente = {
          id_proyecto: proyecto.id_proyecto,
          nombre_proyecto: proyecto.nombre_proyecto,
          descripcion: proyecto.descripcion,
          usuario_creador: {
            id_usuario: proyecto.id_usuario_creador,
            nombre_usuario: proyecto.nombre_usuario_creador,
          },
          tareas: [],
        };
        acc.push(proyectoExistente);
      }

      // Si hay una tarea asociada, agrégala
      if (proyecto.id_tarea) {
        let tareaExistente = proyectoExistente.tareas.find(
          (t) => t.id_tarea === proyecto.id_tarea
        );

        if (!tareaExistente) {
          tareaExistente = {
            id_tarea: proyecto.id_tarea,
            titulo: proyecto.titulo_tarea,
            descripcion: proyecto.descripcion_tarea,
            fecha_limite: proyecto.fecha_limite,
            estado: proyecto.estado,
            usuarios: [],
          };
          proyectoExistente.tareas.push(tareaExistente);
        }

        // Si hay un usuario asociado a la tarea, agrégalo
        if (proyecto.id_usuario_tarea) {
          tareaExistente.usuarios.push({
            id_usuario: proyecto.id_usuario_tarea,
            nombre_usuario: proyecto.nombre_usuario_tarea,
          });
        }
      }

      return acc;
    }, []);

    res.json({ proyectos: proyectosAgrupados });
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
