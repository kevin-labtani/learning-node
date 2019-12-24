const jwt = require("jsonwebtoken");
const User = require("../models/user");

// to test in Postman, setup a header key:Authorization value: Bearer verylongtokenstring
// or use authentification tab and set up Bearer token
// or inherit from parent and set up Bearer token for the collection with {{authToken}} as token and then:
// Postman code to put in test on create user and login route:
// if (pm.response.code === 200) {
//   pm.environment.set("authToken", pm.response.json().token);
// }

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user with the correct id and who has that auth token still stored
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error(); // will trigger catch
    }

    // give the route handlers access to the user and the token
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
