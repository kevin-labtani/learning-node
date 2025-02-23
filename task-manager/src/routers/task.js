const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const router = new express.Router();

// endpoint to create a new task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint for reading tasks
// GET /tasks?completed=true
// limit skip options for pagination
// GET /tasks?limit=10&skip=10
// sort tasks
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  // 3 options: no query params, or completed=true or completed=false
  const match = {};

  if (req.query.completed) {
    // convert from string to bool
    match.completed = req.query.completed === "true";
  }

  // again, 3 options
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] == "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for reading a single task
router.get("/tasks/:id", auth, async (req, res) => {
  // mongoose auto convert string id into object ids
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    return res.status(500).send();
  }
});

// endpoint to update a task
router.patch("/tasks/:id", auth, async (req, res) => {
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
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint to delete a user
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
