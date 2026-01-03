const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration : {
        type: Number,
        default: 7,
    },
    progress: {
      type: Number,
      default:0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 👈 User model reference
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
