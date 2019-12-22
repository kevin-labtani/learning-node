// explore mongoose promises
require("../src/db/mongoose");
const User = require("../src/models/user");

// set a user age to one and then find all the users aged 1
User.findByIdAndUpdate("5dfe1b60d3bcce17786b37c9", {
  age: 1,
})
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
