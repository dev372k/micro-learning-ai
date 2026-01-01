const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    preferredTopics: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true, // 👈 createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model('User', userSchema);
