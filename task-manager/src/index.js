const app = require("./app");

const port = process.env.PORT;

// on dev, start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
