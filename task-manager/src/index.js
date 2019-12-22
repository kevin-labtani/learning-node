const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

// parse incoming json to an object
app.use(express.json());

// express routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // provide payload, secret, expiration
  token = jwt.sign({ _id: "abc123" }, "thisismysecret", {
    expiresIn: "7 days",
  });
  console.log(token);

  // return the payload for the token , if no error
  const data = jwt.verify(token, "thisismysecret");
  console.log(data);
};

myFunction();
