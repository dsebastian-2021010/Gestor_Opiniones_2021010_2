import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../controllers/post.controller.js'

import { authenticate } from '../middleware/auth.middleware.js'

export async function postRoutes(fastify) {

  // Públicas
  fastify.get('/', getAllPosts)
  fastify.get('/:id', getPostById)

  // Protegidas
  fastify.post('/', {
    preHandler: [authenticate]
  }, createPost)

  fastify.put('/:id', {
    preHandler: [authenticate]
  }, updatePost)

  fastify.delete('/:id', {
    preHandler: [authenticate]
  }, deletePost)
}