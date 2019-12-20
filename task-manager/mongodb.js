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

    // change the name for one of our users
    db.collection("tasks")
      .updateMany(
        {
          completed: false,
        },
        {
          // Sets the value of a field in a document.
          // full list of update operators : https://docs.mongodb.com/manual/reference/operator/update/
          $set: {
            completed: true,
          },
        },
      )
      .then(result => console.log(result))
      .catch(error => console.log(error));

    //   // increment age for one of our users
    //   db.collection("users")
    //     .updateOne(
    //       {
    //         _id: new ObjectID("5dfca32b4f24b071dc53da7b"),
    //       },
    //       {
    //         // Sets the value of a field in a document.
    //         // full list of update operators : https://docs.mongodb.com/manual/reference/operator/update/
    //         $inc: {
    //           age: 1,
    //         },
    //       },
    //     )
    //     .then(result => console.log(result))
    //     .catch(error => console.log(error));
  },
);
