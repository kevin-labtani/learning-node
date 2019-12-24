const request = require("supertest");
const app = require("../src/app");

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
