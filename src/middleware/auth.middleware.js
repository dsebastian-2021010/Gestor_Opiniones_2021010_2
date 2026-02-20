// src/middleware/auth.middleware.js

export const authenticate = async (request, reply) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.code(401).send({
      message: 'No autorizado. Token inválido o expirado.'
    })
  }
}