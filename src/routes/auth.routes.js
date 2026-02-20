import { register, login } from '../controllers/auth.controller.js'

export async function authRoutes(fastify) {

  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: {
            type: 'string',
            minLength: 3,
            maxLength: 20
          },
          email: {
            type: 'string',
            format: 'email'
          },
          password: {
            type: 'string',
            minLength: 6
          }
        }
      }
    }
  }, register)


  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['identifier', 'password'],
        properties: {
          identifier: { type: 'string' },
          password: {
            type: 'string',
            minLength: 6
          }
        }
      }
    }
  }, login)
}