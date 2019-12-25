const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  setupDatabase,
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
} = require("./fixtures/db");

// use --runInBand option for Jest to make tests run serially
// Jest env setup
beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "Test my app",
    })
    .expect(201);
  // assert the task exist in the db
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test("Should get tasks for user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  // we have 2 tasks for userOne
  expect(response.body.length).toBe(2);
});

test("Should not delete task not owned by user", async () => {
  await request(app)
    .delete(`/task/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  // assert the task is stil in the db
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull()
});
