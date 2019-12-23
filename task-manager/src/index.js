const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// multer file upload example
const multer = require("multer");
const upload = multer({
  dest: "images",
});

// test with postman, with a POST req, and set a body with form-data, with key: "upload" and value "link/to/img"
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send(); // we get a randomly generated file name with no extension uploaded to /images
});

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
