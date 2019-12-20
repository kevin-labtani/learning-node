const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1]); // if result (dummy answer)
    reject("this is an error"); // if error
  }, 1000);
});

doWorkPromise
  .then(result => console.log("Success!", result))
  .catch(error => console.log(error));
