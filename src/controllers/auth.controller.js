// src/controllers/auth.controller.js

import { User } from '../models/user.model.js'

/*
  REGISTRO
*/
export const register = async (request, reply) => {
  try {
    const { username, email, password } = request.body

    // Verificar si ya existe usuario o email
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return reply.code(400).send({
        message: 'El usuario o correo ya está registrado'
      })
    }

    const user = new User({ username, email, password })
    await user.save()

    return reply.code(201).send({
      message: 'Usuario registrado correctamente'
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al registrar usuario',
      error: error.message
    })
  }
}


/*
  LOGIN (email o username)
*/
export const login = async (request, reply) => {
  try {
    const { identifier, password } = request.body
    // identifier puede ser email o username

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    })

    if (!user) {
      return reply.code(400).send({
        message: 'Credenciales inválidas'
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return reply.code(400).send({
        message: 'Credenciales inválidas'
      })
    }

    // Generar token
    const token = await reply.jwtSign({
      id: user._id,
      username: user.username
    })

    return reply.send({
      message: 'Login exitoso',
      token
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error en login',
      error: error.message
    })
  }
}