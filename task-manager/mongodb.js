const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
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

    // db will be auto created by just picking a name and accessing it
    const db = client.db(databaseName);

    // collection equivalent to a table in sql
    // will be auto created when we try to access it
    db.collection("users").insertOne({
      name: "Kevin",
      age: 37,
    });
  },
);
