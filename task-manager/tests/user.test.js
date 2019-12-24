const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

// create an id for our test user so we can use it to generate a jwt fo rtesting purpose
const userOneId = new mongoose.Types.ObjectId();
// setup a test user
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "duty5689!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
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

test("Sould get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Sould not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Sould delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Sould not not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});
