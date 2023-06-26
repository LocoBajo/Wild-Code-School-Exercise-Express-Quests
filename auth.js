const jwt = require('jsonwebtoken');

const verifyPassword = async (req, res) => {

  argon2

    .verify(req.user.hashedPassword, req.body.password)

    .then((isVerified) => {

      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });

      } else {
        res.sendStatus(401);
      }
    })

    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });

};

const verifyToken = (req, res, next) => {

  try {
    let header = req.get("Authorization")

    if (header == null) {
    throw new Error("Authorization header is missing")
  }
    const [type, token] = header.split(" ");

    if(type != "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();

  } catch (err) {

    console.error(err);

    res.sendStatus(401);

  }

};

const argon2 = require("argon2");

const hashingOptions = {

    type: argon2.argon2id,
  
    memoryCost: 2 ** 16,
  
    timeCost: 5,
  
    parallelism: 1,
  
  };

const hashPassword = (req, res, next) => {
const password = (req.body.password)
argon2
.hash(password, hashingOptions)
.then((hashedPassword) => {
    req.body.hashedPassword = hashedPassword 
    delete password
    next()
}) 
.catch((err) => {

    console.error(err);

    res.sendStatus(500);

  });


  // hash the password using argon2 then call next()

};



module.exports = {

  hashPassword, verifyPassword, verifyToken,

};