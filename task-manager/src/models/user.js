const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// create schema for our users
const userSchema = new mongoose.Schema({
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
    unique: true,
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
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
});

// add static function findByCredentials to the user model
userSchema.statics.findByCredentials = async (email, password) => {
  // fetch our user by email, if they exist
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  // check if password is a match for our user
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// middleware are a way to customise the behavior of our mongoose model
// function passed can't be an arrow fuctions as we need "this"
// hash th eplain text password
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// create a model for our users
const User = mongoose.model("User", userSchema);

module.exports = User;
