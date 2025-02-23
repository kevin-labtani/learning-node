// setTimeout(() => {
//   console.log("one second timeout");
// }, 1000);

// const names = ["Andrew", "Jen", "Jess"];
// const shortNames = names.filter(name => name.length <= 4);

const geocode = (address, callback) => {
  // simulate delay with setTimeout
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };
    callback(data);
  }, 2000);
};

geocode("Philadelphia", data => {
  console.log(data);
});

// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (num1, num2, callback) => {
  setTimeout(() => {
    const sum = num1 + num2;
    callback(sum);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum); // Should print: 5
});

const doWorkCallback = callback => {
  setTimeout(() => {
    // callback("this is an error", undefined); // if error
    callback(undefined, [1, 4, 7]); // if result (dummy answer)
  }, 1000);
};

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error);
  }

  console.log(result);
});
