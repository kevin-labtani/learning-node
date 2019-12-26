const users = [];

// addUser
const addUser = ({ id, username, room }) => {
  // clean data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  // validate data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  // check uniqueness
  const existingUser = users.find(user => {
    // if an user with the same name is in the same room
    return user.room === room && user.username === username;
  });
  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  // store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

// removeUser
const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    // remove user, get back an array, get the first(and only) item to get an object
    return users.splice(index, 1)[0];
  }
};

// getUser
const getUser = id => {
  return users.find(user => user.id === id);
};

// getUsersInRoom
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
