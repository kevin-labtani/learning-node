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

    db.collection("users").findOne({ name: "Jen" }, (error, result) => {
      if (error) {
        return console.log("Unable to fetch");
      }
      // nb: return null if no document matches the search
      // return the 1st match if there are many
      console.log(result);
    });

    // search by id
    db.collection("users").findOne(
      { _id: new ObjectID("5dfca32b4f24b071dc53da7b") },
      (error, result) => {
        if (error) {
          return console.log("Unable to fetch");
        }
        // nb: return null if no document matches the search
        // return the 1st match if there are many
        console.log(result);
      },
    );

    // search for more than one item
    // return a Cursor
    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, result) => {
        console.log(result);
      });
  },
);
