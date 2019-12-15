// apps have their own scope, app.js can't access the variables from utils.js, we need to explicitely export them.
const add = require("./utils.js");

const sum = add(4, -2);
console.log(sum);
