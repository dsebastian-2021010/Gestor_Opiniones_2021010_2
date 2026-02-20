import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { config } from '../config/env.js'

export default fp(async function (app) {
  app.register(fastifyJwt, {
    secret: config.JWT_SECRET
  })
})