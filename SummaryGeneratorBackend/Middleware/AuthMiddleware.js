//this file is usded to check that user is login or not bro
let jwt = require("jsonwebtoken");
require("dotenv").config();

let AuthMiddleware = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "user is a not Login", CheckLogin: false });
    }
    let decode = jwt.verify(token, process.env.SecretKey);
    console.log("decode successfully", decode, decode.Role);

    //  Attach user info to the request object
    // Now any route using this middleware can access req.user
    req.user = decode;

    // 4. CRITICAL: Call next() to move to the actual route!
    next();
  } catch (error) {
    console.log("internal errror bro ", error);
    res
      .status(500)
      .json({ message: "some thing went wrong", error, CheckLogin: false });
  }
};
module.exports = AuthMiddleware;
