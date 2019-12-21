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

// create a user
const me = new User({
  name: "Kevin",
  age: poop,
});

// save into the db, returns a promise
me.save()
  .then(() => {
    console.log(me);
    //  __v stores the version of the document
  })
  .catch(error => {
    console.log("Error!", error);
  });
