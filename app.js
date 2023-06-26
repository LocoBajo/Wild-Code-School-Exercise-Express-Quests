require("dotenv").config();

const express = require("express");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie } = require("./validators.js");
const { validateUser } = require("./validators.js"); 
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

                  //public routes
app.get("/", welcome);
//movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
//users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
//login
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

//authentification wall
app.use(verifyToken);

                  //protected routes
//movies
app.post("/api/movies", validateMovie, movieHandlers.postMovies);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovies);
app.delete("/api/movies/:id", movieHandlers.deleteMovies)
//users
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
