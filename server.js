import { buildApp } from './src/app.js'
import { config } from './src/config/env.js'

const start = async () => {
  try {
    const app = await buildApp()

    await app.listen({
      port: config.PORT,
      host: '0.0.0.0'
    })

    console.log(`🚀 Servidor corriendo en puerto ${config.PORT}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()