const fs = require("fs");

// // create and write to the file
// const book = {
//   title: "Ego is the enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

// // read the file
// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// challenge
// original 2-json.json: {"name":"Andrew","planet":"Earth","age":27}
const dataBuffer = fs.readFileSync("2-json.json");
const dataJSON = dataBuffer.toString();
const user = JSON.parse(dataJSON);

user.name = "kevin";
user.age = 37;

const modifiedDataJSON = JSON.stringify(user);
fs.writeFileSync("2-json.json", modifiedDataJSON);
