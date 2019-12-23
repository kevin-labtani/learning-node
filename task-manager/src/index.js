const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// on dev, start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

// parse incoming json to an object
app.use(express.json());

// express routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

// demo

const main = async () => {
  // // get a user from their task
  // const task = await Task.findById("5e008f17d9aaab5478e4da24");
  // // find the user associated with this task and task.owner will now become the user object rathen than jsut an id
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);

  // get tasks from a user
  const user = await User.findById("5dffb93e855c4e1d0175b4d9");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
