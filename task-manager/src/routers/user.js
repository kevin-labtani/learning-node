const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/auth");

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

// endpoint for user log out of current session
router.post("/users/logout", auth, async (req, res) => {
  // target the specific token that was used when user auth., don't want to log user out on all platforms they use
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      // keep all the tokens that weren't used to auth
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for user log out out of all sessions
router.post("/users/logoutAll", auth, async (req, res) => {
  // target the specific token that was used when user auth., don't want to log user out on all platforms they use
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// endpoint for reading user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// endpoint to update a user
router.patch("/users/me", auth, async (req, res) => {
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
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// endpoint to delete a user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// multer dest directory and options
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  // filter files we allow
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // reject the file
      return cb(new Error("File must be a .jp(e)g or .png"));
    }
    // accept the file
    cb(null, true);
  },
});

// endpoint for user avatar upload
// test with postman, with a POST req, and set a body with form-data, with key: "upload" and value "link/to/img"
router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req, res) => {
    res.send(); // we get a randomly generated file name with no extension uploaded to /images
  },
  // to handle our error, need to have this call signature with the 4 args
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

module.exports = router;
