const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
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
