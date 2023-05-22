const database = require('./database')
const mysql = require("mysql2/promise");

const getUsers = (req, res) => {

  let sql = "select * from users"
  let sqlValues = []

  if (req.query.language != undefined && req.query.city != undefined) {
    sql = "select * from users where language = ? and city = ?"
    sqlValues = [req.query.language, req.query.city]
  }
  else if (req.query.language != undefined) {
    sql = "select * from users where language = ?" ; 
    sqlValues = [req.query.language]
  }

  else  if (req.query.city != undefined) {
    sql = "select * from users where city = ?" ; 
    sqlValues = [req.query.city]
  }
  database
  .query(sql, sqlValues)
  .then(([users]) => {
  res.status(200).json(users);
})
.catch((err) => {

  console.error(err);

  res.status(500).send("Error retrieving data from database");

});
};

const getUserById = (req,res) => {
    const id = parseInt(req.params.id);
    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0])  
        }
        else {
            res.status(404).send("Not found!!")
        }
    })
    .catch((err) => {

        console.error(err);
        res.status(500).send("Error retrieving data from database"); 
})
}

const postUsers = (req,res) => {
  const { firstname, lastname, email, city, language } = req.body


database
.query(
  "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?,?,?,?,?)", 
  [firstname, lastname, email, city, language])
.then(([result]) => {
res.location(`/api/users/${result.insertId}`).sendStatus(201);
})
.catch((err) => {
  console.error(err); 
  res.status(500).send("Error saving the user")
})
}
const updateUsers = (req,res) => {
  const id = parseInt(req.params.id) 
  const { firstname, lastname, email, city, language } = req.body

database
.query(
  "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?", 
  [firstname, lastname, email, city, language, id])
.then(([result]) => {
  if (result.affectedRows === 0) {
    res.status(404).send("Not Found");
  }
  else {
    res.status(204)
  }})
.catch((err) => {
  console.error(err); 
  res.status(500).send("Error editing the user")
})
}

const deleteUsers = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("delete from users where id = ?", [id])

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error deleting the user");

    });

};

module.exports = {getUsers, getUserById, postUsers, updateUsers, deleteUsers}