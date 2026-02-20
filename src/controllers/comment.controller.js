// src/controllers/comment.controller.js

import { Comment } from '../models/comment.model.js'
import { Post } from '../models/post.model.js'

/*
  Crear comentario
*/
export const createComment = async (request, reply) => {
  try {
    const { postId, content } = request.body

    // Verificar que el post exista
    const postExists = await Post.findById(postId)
    if (!postExists) {
      return reply.code(404).send({
        message: 'La publicación no existe'
      })
    }

    const comment = new Comment({
      content,
      author: request.user.id,
      post: postId
    })

    await comment.save()

    return reply.code(201).send({
      message: 'Comentario creado correctamente',
      comment
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al crear comentario'
    })
  }
}


/*
  Obtener comentarios de un post
*/
export const getCommentsByPost = async (request, reply) => {
  try {
    const { postId } = request.params

    const comments = await Comment.find({ post: postId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })

    return reply.send(comments)

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al obtener comentarios'
    })
  }
}


/*
  Editar comentario (solo dueño)
*/
export const updateComment = async (request, reply) => {
  try {
    const { id } = request.params
    const { content } = request.body

    const comment = await Comment.findById(id)

    if (!comment) {
      return reply.code(404).send({
        message: 'Comentario no encontrado'
      })
    }

    if (comment.author.toString() !== request.user.id) {
      return reply.code(403).send({
        message: 'No tienes permiso para editar este comentario'
      })
    }

    comment.content = content
    await comment.save()

    return reply.send({
      message: 'Comentario actualizado correctamente',
      comment
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al actualizar comentario'
    })
  }
}


/*
  Eliminar comentario (solo dueño)
*/
export const deleteComment = async (request, reply) => {
  try {
    const { id } = request.params

    const comment = await Comment.findById(id)

    if (!comment) {
      return reply.code(404).send({
        message: 'Comentario no encontrado'
      })
    }

    if (comment.author.toString() !== request.user.id) {
      return reply.code(403).send({
        message: 'No tienes permiso para eliminar este comentario'
      })
    }

    await comment.deleteOne()

    return reply.send({
      message: 'Comentario eliminado correctamente'
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al eliminar comentario'
    })
  }
}