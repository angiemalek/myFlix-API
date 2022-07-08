const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/[myFlixDB]", { useNewUrlParser: true, useUnifiedTopology: true });

// USE BODY PARSER
const cors= require("cors"); //Need to add domains allowed
app.use(cors());

let auth = require("./auth")(app);

app.use(morgan("common"));

app.use(bodyParser.json());

app.use(express.static("public"));

const passport = require("passport");
require("./passport");

//GET REQUESTS  WORKS

app.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.send("Welcome to this awesome Movie App!");
});

// READ (GET) LIST OF ALL MOVIES WORKS
app.get("/movies", passport.authenticate("jwt", {session: false}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET REQUEST TO RETURN ALL USERS WORKS
app.get("/users", passport.authenticate("jwt", {session: false}), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET REQUEST TO RETURN USER BY USERNAME  WORKS
app.get("/users/:Username", passport.authenticate("jwt", {session: false}), (req, res) => {
  Users.findOne({ Username : req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ (GET) ONE MOVIE BY TITLE WORKS
app.get("/movies/:Title", passport.authenticate("jwt", {session: false}), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// RETURN (GET) DATA ABOUT A GENRE BY NAME/TITLE WORKS
app.get("/movies/Genre/:Name", passport.authenticate("jwt", {session: false}), (req, res) => {
  Movies.findOne({ "Genre.Name" : req.params.Name })
    .then((movie) => {
      res.json(movie.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//RETURN (GET) DATA ABOUT A DIRECTOR WORKS
app.get("/movies/Director/:Name", passport.authenticate("jwt", {session: false}), (req, res) => {
  Movies.findOne({ "Director.Name" : req.params.Name })
  .then((movie) => {
    res.json(movie.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// CREATE(POST) NEW USER MONGOOSE
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            FavoriteMovies: req.body.FavoriteMovies
          })
          .then((user) => {
            res.status(201).json(user)
          })
          .catch((error) => {
            console.error(err);
            res.status(500).send("Error: " + err);
          })
        }
      })
      .catch((error) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});

//UPDATE (PUT) USER INFO BY NAME MONGOOSE
app.put("/users/:Username", passport.authenticate("jwt", {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username },
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        FavoriteMovies: req.body.FavoriteMovies
      }
    },
    { new: true },
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//DELETE USER BY USERNAME MONGOOSE
app.delete("/users/:Username", passport.authenticate("jwt", {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// CREATE (POST) ADD MOVIE TO USER FAVORITES BY MOVIE TITLE MONGOOSE
app.post("/users/:Username/movies/:Title", passport.authenticate("jwt", {session: false}), (req,res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.Title}
    },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//DELETE MOVIE FROM USERS LIST BY MOVIE TITLE MONGOOSE
app.delete("/users/:Username/movies/:Title", passport.authenticate("jwt", {session: false}), (req,res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.Title}
    },
  { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// ERROR EVENT HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});


// LISTEN FOR REQUESTS
app.listen(8080, () => {
  console.log("App is listening to port 8080");
});
