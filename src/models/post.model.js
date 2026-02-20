// src/models/post.model.js

import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100
    },

    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },

    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 5000
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Post = mongoose.model('Post', postSchema)