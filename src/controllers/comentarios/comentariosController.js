const { response } = require('express');
const Comentario = require('../../models/cometnario/comentarioModel');
const Usuario = require('../../models/usuario/usuarioModel');
const Tarea = require('../../models/tarea/tareaModel');

// Obtener todos los comentarios
const getComentarios = async (req, res = response) => {
  const { id_tarea } = req.query; // Captura el id_tarea de la consulta
  try {
    const whereCondition = id_tarea ? { id_tarea } : {}; // Filtro opcional por id_tarea
    const comentarios = await Comentario.findAll({
      where: whereCondition,
      include: [
        { model: Usuario, attributes: ['id_usuario', 'nombre_usuario'] },
        { model: Tarea, attributes: ['id_tarea', 'titulo'] },
      ],
    });
    res.json({ comentarios });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};


const getComentarioById = async (req, res = response) => {
  const { id_tarea } = req.params; // Toma el parámetro de la URL

  try {
      const comentarios = await Comentario.findAll({
          where: { id_tarea }, // Filtra por id_tarea en lugar de id_comentario
          include: [
              { model: Usuario, attributes: ['id_usuario', 'nombre_usuario'] },
              { model: Tarea, attributes: ['id_tarea', 'titulo'] },
          ],
      });

      if (!comentarios.length) {
          return res.status(404).json({ error: 'No se encontraron comentarios para esta tarea' });
      }

      res.json({ comentarios });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};




// Crear un nuevo comentario
const createComentario = async (req, res = response) => {
  
  const { contenido, id_usuario, id_tarea } = req.body;
  console.log("ID de tarea recibido en el backend:", id_tarea);

  try {
    const nuevoComentario = await Comentario.create({ contenido, id_usuario, id_tarea });
    res.status(201).json({ comentario: nuevoComentario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

// Actualizar un comentario
const updateComentario = async (req, res = response) => {
  const { id_comentario } = req.params;
  const { contenido } = req.body; // Solo se actualiza el contenido

  try {
    const comentario = await Comentario.findByPk(id_comentario);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    // Solo actualiza el contenido
    await comentario.update({ contenido });
    res.json({ comentario });
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
};



// Eliminar un comentario
const deleteComentario = async (req, res = response) => {
  const { id } = req.params;

  try {
    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    await comentario.destroy();
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};

module.exports = {
  getComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
};
