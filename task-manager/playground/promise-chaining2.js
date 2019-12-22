// explore mongoose promises
require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("5dfe13ce481bd908921e6523")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
