import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} from '../controllers/comment.controller.js'

import { authenticate } from '../middleware/auth.middleware.js'

export async function commentRoutes(fastify) {

  // Obtener comentarios de un post
  fastify.get('/post/:postId', getCommentsByPost)

  // Crear comentario
  fastify.post('/', {
    preHandler: [authenticate]
  }, createComment)

  // Editar comentario
  fastify.put('/:id', {
    preHandler: [authenticate]
  }, updateComment)

  // Eliminar comentario
  fastify.delete('/:id', {
    preHandler: [authenticate]
  }, deleteComment)

}