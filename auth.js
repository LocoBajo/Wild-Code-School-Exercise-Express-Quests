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
    console.log(hashedPassword); 
    req.body.hashedPassword = hashedPassword 
    console.log(req.body.hashedPassword)
    delete password
    console.log("test")
    next()
    console.log("test2")
}) 
.catch((err) => {

    console.error(err);

    res.sendStatus(500);

  });


  // hash the password using argon2 then call next()

};


module.exports = {

  hashPassword,

};