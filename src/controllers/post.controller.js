// src/controllers/post.controller.js

import { Post } from '../models/post.model.js'

/*
  Crear publicación
*/
export const createPost = async (request, reply) => {
  try {
    const { title, category, content } = request.body

    const post = new Post({
      title,
      category,
      content,
      author: request.user.id
    })

    await post.save()

    return reply.code(201).send({
      message: 'Publicación creada correctamente',
      post
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al crear publicación'
    })
  }
}


/*
  Obtener todas las publicaciones
*/
export const getAllPosts = async (request, reply) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 })

    return reply.send(posts)

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al obtener publicaciones'
    })
  }
}


/*
  Obtener una publicación por ID
*/
export const getPostById = async (request, reply) => {
  try {
    const { id } = request.params

    const post = await Post.findById(id)
      .populate('author', 'username email')

    if (!post) {
      return reply.code(404).send({
        message: 'Publicación no encontrada'
      })
    }

    return reply.send(post)

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al obtener publicación'
    })
  }
}


/*
  Editar publicación (solo dueño)
*/
export const updatePost = async (request, reply) => {
  try {
    const { id } = request.params
    const { title, category, content } = request.body

    const post = await Post.findById(id)

    if (!post) {
      return reply.code(404).send({
        message: 'Publicación no encontrada'
      })
    }

    if (post.author.toString() !== request.user.id) {
      return reply.code(403).send({
        message: 'No tienes permiso para editar esta publicación'
      })
    }

    if (title) post.title = title
    if (category) post.category = category
    if (content) post.content = content

    await post.save()

    return reply.send({
      message: 'Publicación actualizada correctamente',
      post
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al actualizar publicación'
    })
  }
}


/*
  Eliminar publicación (solo dueño)
*/
export const deletePost = async (request, reply) => {
  try {
    const { id } = request.params

    const post = await Post.findById(id)

    if (!post) {
      return reply.code(404).send({
        message: 'Publicación no encontrada'
      })
    }

    if (post.author.toString() !== request.user.id) {
      return reply.code(403).send({
        message: 'No tienes permiso para eliminar esta publicación'
      })
    }

    await post.deleteOne()

    return reply.send({
      message: 'Publicación eliminada correctamente'
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al eliminar publicación'
    })
  }
}