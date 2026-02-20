import fp from 'fastify-plugin'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export default fp(async function (fastify) {

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Gestor de Opiniones API',
        description: 'API desarrollada para Laboratorio 2',
        version: '1.0.0'
      }
    }
  })

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })

})