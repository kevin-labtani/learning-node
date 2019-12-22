const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

// start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

// parse incoming json to an object
app.use(express.json());

// endpoint to create new user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint for reading users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users); //array
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for reading a single user
// express route parameter used to get dynamic part of the url
app.get("/users/:id", async (req, res) => {
  // mongoose auto convert string id into object ids
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      // not getting anything back isn't an error for mongo so we have to handle the case
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    return res.status(500).send();
  }
});

// endpoint to update a user
app.patch("/users/:id", async (req, res) => {
  // check if user is trying to update sth he can't
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  // find user to update by id, and update it
  try {
    // new will return the new, modified user rather than the one that was found before the update
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint to delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint to create a new task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint for reading tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for reading a single task
app.get("/tasks/:id", async (req, res) => {
  // mongoose auto convert string id into object ids
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    return res.status(500).send();
  }
});

// endpoint to update a task
app.patch("/tasks/:id", async (req, res) => {
  // check if user is trying to update sth he can't
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  // find task to update by id, and update it
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint to delete a user
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
