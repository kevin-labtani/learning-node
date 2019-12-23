const mongoose = require("mongoose");

// create a schema for tasks
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      // user's object id
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// create a model for our tasks
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
