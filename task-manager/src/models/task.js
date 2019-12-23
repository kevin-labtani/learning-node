const mongoose = require("mongoose");

// create a model for our tasks
const Task = mongoose.model("Task", {
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
});

module.exports = Task;
