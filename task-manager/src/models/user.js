const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

// create schema for our users
const userSchema = new mongoose.Schema(
  {
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  },
);

// add relationship with the task collection, allow us to get the list of tasks associated with a user
userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

// add static function findByCredentials to the user model
// statics methods are accessible on the model
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

// add generateAuthToken() method for specific users
// methods are accessible on the instance
userSchema.methods.generateAuthToken = async function() {
  // to make the functione sasier to read
  const user = this;

  // user._id is an object,w e convert it to a string
  const token = jwt.sign({ _id: user._id.toString() }, "thisismysecret00");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// return a user profile without the password or tokens
// toJSON modify the behavior of JSON.stringify called behind the scenes whenever a user is sent back
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
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

// delete user tasks when user is removed
userSchema.pre("remove", async function(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

// create a model for our users
const User = mongoose.model("User", userSchema);

module.exports = User;
