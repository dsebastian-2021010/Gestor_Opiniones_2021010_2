// src/app.js

import Fastify from 'fastify'
import { connectDB } from './config/db.js'
import { config } from './config/env.js'
import jwtPlugin from './plugins/jwt.plugin.js'

import { authRoutes } from './routes/auth.routes.js'
import { userRoutes } from './routes/user.routes.js'
import { postRoutes } from './routes/post.routes.js'
import { commentRoutes } from './routes/comment.routes.js'
import { errorHandler } from './middleware/error.middleware.js' 
import swaggerPlugin from './plugins/swagger.plugin.js'

export async function buildApp() {

  const app = Fastify({
    logger: true
  })

  await connectDB()

  // Registrar plugins
  await app.register(jwtPlugin)
  await app.register(swaggerPlugin)
  // Registrar rutas (IMPORTANTE: dentro de la función)
  await app.register(authRoutes, { prefix: '/api/auth' })
  await app.register(userRoutes, { prefix: '/api/users' })
  await app.register(postRoutes, { prefix: '/api/posts' })
  await app.register(commentRoutes, { prefix: '/api/comments' })

  app.setErrorHandler(errorHandler);

  app.get('/', async () => {
    return { message: 'API Gestor de Opiniones funcionando 🚀' }
  })

  return app
  
}

