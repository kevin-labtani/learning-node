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

// bcrypt example
const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const password = "Red1234!";
  const hashedPassword = await bcrypt.hash(password, 8); // 8 is number of rounds (#times the hashing algo is run)

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("red1234!", hashedPassword);
  console.log(isMatch);
};

myFunction();
// hashing algorithms are one way, can't get the pwd back
// encryption algorithms work both way
