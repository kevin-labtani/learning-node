// explore mongoose promises
require("../src/db/mongoose");
const Task = require("../src/models/task");

// deletea task and count the number of incomplete tasks remaining
// Task.findByIdAndDelete("5dfe13ce481bd908921e6523")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// rewrite with async await
const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5dfe1dc1452c481d0c53bdad")
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
