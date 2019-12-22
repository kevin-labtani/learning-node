// explore mongoose promises
require("../src/db/mongoose");
const User = require("../src/models/user");

// // set a user age to one and then find all the users aged 1
// // promise chaining
// User.findByIdAndUpdate("5dfe1b60d3bcce17786b37c9", {
//   age: 1,
// })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// rewrite with async await
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5dfe1b60d3bcce17786b37c9", 2)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });
