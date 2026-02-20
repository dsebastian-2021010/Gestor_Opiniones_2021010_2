// src/controllers/user.controller.js

import { User } from '../models/user.model.js'

/*
  Obtener perfil del usuario autenticado
*/
export const getProfile = async (request, reply) => {
  try {
    const user = await User.findById(request.user.id).select('-password')

    return reply.send(user)
  } catch (error) {
    return reply.code(500).send({
      message: 'Error al obtener perfil'
    })
  }
}


/*
  Editar perfil (username o email)
*/
export const updateProfile = async (request, reply) => {
  try {
    const { username, email } = request.body

    const user = await User.findById(request.user.id)

    if (!user) {
      return reply.code(404).send({ message: 'Usuario no encontrado' })
    }

    if (username) user.username = username
    if (email) user.email = email

    await user.save()

    return reply.send({
      message: 'Perfil actualizado correctamente'
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al actualizar perfil'
    })
  }
}


/*
  Cambiar contraseña (validando anterior)
*/
export const changePassword = async (request, reply) => {
  try {
    const { currentPassword, newPassword } = request.body

    const user = await User.findById(request.user.id)

    const isMatch = await user.comparePassword(currentPassword)

    if (!isMatch) {
      return reply.code(400).send({
        message: 'La contraseña actual es incorrecta'
      })
    }

    user.password = newPassword
    await user.save()

    return reply.send({
      message: 'Contraseña actualizada correctamente'
    })

  } catch (error) {
    return reply.code(500).send({
      message: 'Error al cambiar contraseña'
    })
  }
}