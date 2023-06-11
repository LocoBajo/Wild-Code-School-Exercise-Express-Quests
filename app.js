require("dotenv").config();

const express = require("express");

const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js"); 
const { hashPassword } = require("./auth.js");
const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", validateMovie, movieHandlers.postMovies);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovies);
app.delete("/api/movies/:id", movieHandlers.deleteMovies)

const userHandlers = require("./userHandlers")
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users",validateUser, hashPassword, userHandlers.postUsers);
app.put("/api/users/:id", validateUser, hashPassword, userHandlers.updateUsers);
app.delete("/api/users/:id", userHandlers.deleteUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
