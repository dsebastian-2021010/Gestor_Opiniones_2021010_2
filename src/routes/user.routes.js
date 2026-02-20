import { getProfile, updateProfile, changePassword } from '../controllers/user.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

export async function userRoutes(fastify) {

  fastify.get('/profile', {
    preHandler: [authenticate]
  }, getProfile)


  fastify.put('/profile', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 3,
            maxLength: 20
          },
          email: {
            type: 'string',
            format: 'email'
          }
        }
      }
    }
  }, updateProfile)


  fastify.put('/change-password', {
    preHandler: [authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['currentPassword', 'newPassword'],
        properties: {
          currentPassword: {
            type: 'string',
            minLength: 6
          },
          newPassword: {
            type: 'string',
            minLength: 6
          }
        }
      }
    }
  }, changePassword)

}