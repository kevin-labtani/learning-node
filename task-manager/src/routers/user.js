const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
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
    cb(undefined, true);
  },
});

// endpoint for user avatar upload
// test with postman, with a POST req, and set a body with form-data, with key: "upload" and value "link/to/img"
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // save the uploaded files as user avatar
    // use sharp to resize and convert avatars to png
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  // to handle our errors, need to have this call signature with the 4 args
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

// endpoint for user avatar delete
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// endpoint to serve user avatar
// eg: <img src="http://localhost:3000/users/5e00b659a4442a1a8c8b3a3d/avatar">
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    // send response header telling wether the img is a jpeg or a png
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
