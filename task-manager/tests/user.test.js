const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "Mike",
  email: "mike@example.com",
  password: "duty5689!",
};

// Jest env setup
beforeEach(async () => {
  // delete all users
  await User.deleteMany();
  // add a user for testing purpose
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Test Subject",
      email: "test@example.com",
      password: "MyPas777!",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login nonexistant user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "test@test.com",
      password: "somepassword",
    })
    .expect(400);
});
