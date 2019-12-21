const mongoose = require("mongoose");

// connct to db with mongoose, create it if it doesn't exist
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// create a model for our users
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// // create a user
// const me = new User({
//   name: "Kevin",
//   age: 37,
// });

// // save into the db, returns a promise
// me.save()
//   .then(() => {
//     console.log(me);
//     //  __v stores the version of the document
//   })
//   .catch(error => {
//     console.log("Error!", error);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const task = new Task({
  description: "Buy food",
  completed: false,
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error: ", error);
  });
