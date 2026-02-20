// src/middleware/error.middleware.js

export const errorHandler = (error, request, reply) => {

  // Errores de validación de Fastify
  if (error.validation) {
    return reply.status(400).send({
      message: 'Error de validación',
      errors: error.validation
    })
  }

  // Error JWT
  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    return reply.status(401).send({
      message: 'Token no proporcionado'
    })
  }

  if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
    return reply.status(401).send({
      message: 'Token expirado'
    })
  }

  // Error genérico
  reply.status(error.statusCode || 500).send({
    message: error.message || 'Error interno del servidor'
  })
}