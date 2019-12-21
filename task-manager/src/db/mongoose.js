const mongoose = require("mongoose");
const validator = require("validator");

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
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase.includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
});

// // create a user
// const me = new User({
//   name: "Kevin    ",
//   email: "MYEMAIL@Hotmmai.com   ",
//   password: "passWORD",
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
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task = new Task({
  description: "Feed cat    ",
});

task
  .save()
  .then(() => {
    console.log(task);
  })
  .catch(error => {
    console.log("Error: ", error);
  });
