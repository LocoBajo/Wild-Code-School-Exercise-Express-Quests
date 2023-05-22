
const database = require('./database')
const mysql = require("mysql2/promise");

const getMovies = (req, res) => {
  let sql = "select * from movies"
  let sqlValues = []
  if (req.query.color != undefined && req.query.max_duration != undefined) {
    sql = "select * from movies where color = ? and duration <= ?"
    sqlValues = [req.query.color, req.query.max_duration]
  }
  else if (req.query.color != undefined) {
    sql = "select * from movies where color = ?" ; 
    sqlValues = [req.query.color]
  }
  else if (req.query.max_duration != undefined) {
    sql = "select * from movies where duration <= ?"
    sqlValues = [req.query.max_duration]
  }
  database
  .query(sql, sqlValues)
  .then(([movies]) => {
  res.json(movies);
})
.catch((err) => {

  console.error(err);

  res.status(500).send("Error retrieving data from database");

});
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
  .query("select * from movies where id = ?", [id])
  .then(([movies]) => {
    if (movies[0] != null) {
  res.json(movies[0]);
} else {
  res.status(404).send("Not Found");
}})
.catch((err) => {

  console.error(err);
  res.status(500).send("Error retrieving data from database");

}); }

const postMovies = (req,res) => {
  const { title, director, year, color, duration } = req.body


database
.query(
  "INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)", 
  [title, director, year, color, duration])
.then(([result]) => {
res.location(`/api/movies/${result.insertId}`).sendStatus(201);
})
.catch((err) => {
  console.error(err); 
  res.status(500).send("Error saving the movie")
})
}

const updateMovies = (req,res) => {
  const id = parseInt(req.params.id) 
  const { title, director, year, color, duration } = req.body

database
.query(
  "UPDATE movies SET title = ?, director = ?, year = ?, color = ?, duration = ? WHERE id = ?", 
  [title, director, year, color, duration, id])
.then(([result]) => {
  if (result.affectedRows === 0) {
    res.status(404).send("Not Found");
  }
  else {
    res.status(204)
  }})
.catch((err) => {
  console.error(err); 
  res.status(500).send("Error editing the movie")
})
}

const deleteMovies = (req, res) => {

  const id = parseInt(req.params.id);


  database

    .query("delete from movies where id = ?", [id])

    .then(([result]) => {

      if (result.affectedRows === 0) {

        res.status(404).send("Not Found");

      } else {

        res.sendStatus(204);

      }

    })

    .catch((err) => {

      console.error(err);

      res.status(500).send("Error deleting the movie");

    });

};

module.exports = {
  getMovies,
  getMovieById,
  postMovies,
  updateMovies, 
  deleteMovies,
};
