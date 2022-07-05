const jwtSecret = "your_jwt_secret"; // This needs to be the same key as in JWT Strategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport");  // Local passport file


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // The username you are encoding in JWT
    expiresIn: "7d", //Specifies token expires in 7 days
    algorithm: "HS256"  //Algorithm used to "sign" the values of the JWT
  });
}

/* POST Login */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({user, token});
      });
    })(req, res);
  });
}
