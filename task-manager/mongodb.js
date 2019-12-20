const { MongoClient, ObjectID } = require("mongodb");

// start db with:
// mongod --dbpath=/home/user/Desktop/personal-projects/mead-node/task-manager/mongodb-data

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// // generate a new MongoDB id
// const id = new ObjectID();
// console.log(id.id); // contains the raw binary
// console.log(id.getTimestamp());

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

    // // insert one document with 2 fields
    // db.collection("users").insertOne(
    //   {
    //     // if we want to specify an id
    //     // _id: id,
    //     name: "Vikram",
    //     age: 23,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     // ops is an array with the documents inserted
    //     console.log(result.ops);
    //   },
    // );

    // // insert more than one document
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     {
    //       name: "Mike",
    //       age: 30,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert users");
    //     }
    //     console.log(result.ops);
    //   },
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "feed the cat",
    //       completed: "true",
    //     },
    //     {
    //       description: "go buy food",
    //       completed: "false",
    //     },
    //     {
    //       description: "clean my apartment",
    //       completed: "false",
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert new tasks");
    //     }
    //     console.log(result.ops);
    //   },
    // );
  },
);
