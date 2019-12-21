const { MongoClient, ObjectID } = require("mongodb");

// start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);
  },
);
