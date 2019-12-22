const express = require("express");
const User = require("../models/user");

const router = new express.Router();

// endpoint to create new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // generate jwt when user create account so they don't have to login again right after
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint for user login
router.post("/users/login", async (req, res) => {
  try {
    // using our own defined method
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    // method lives on user not User since it's specific for one user
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// endpoint for reading users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users); //array
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for reading a single user
// express route parameter used to get dynamic part of the url
router.get("/users/:id", async (req, res) => {
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
router.patch("/users/:id", async (req, res) => {
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
    // findByIdAndUpdate bypasses mongoose and perfom the operation directly on the db, not good as we need our middleware to run for pwd hashing, so we need to do it the following way:
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint to delete a user
router.delete("/users/:id", async (req, res) => {
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

module.exports = router;
