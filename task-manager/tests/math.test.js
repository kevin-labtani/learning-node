const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../src/math");

// run jest with npm run test

test("Should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test("Should calculate total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32F to 0°c", () => {
  const convertion = fahrenheitToCelsius(32);
  expect(convertion).toBe(0);
});

test("Should convert O°c to 32F", () => {
  const convertion = celsiusToFahrenheit(0);
  expect(convertion).toBe(32);
});

// // provide done as a param to test async function so Jest wait for done to be retruned before deciding if the test passes or fails
// test("Async test demo", done => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }, 2000);
// });

test("Should add two numbers promise", done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5);
    done();
  });
});

// when the test returns a promise, Jest will wait to see if the promise is fulfilled or rejected before deciding if the test is a success or a failure
test("Should add two numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
