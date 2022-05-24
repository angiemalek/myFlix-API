const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

// USE BODY PARSER
app.use(bodyParser.json());

// USER DATA
let users = [
  {
    id: 1,
    name: "Richard",
  },

  {
    id: 2,
    name: "Betty",
  },
];

// MOVIE DATA
let topMovies = [
  {
    title: "The Dawn Wall",
    year: "2017",
    genre: "Documentary",
    director: "Josh Lowell"
  },
  {
    title: "Mr. Brooks",
    year: "2007",
    genre: "Drama",
    director: "Bruce A. Evans"
  },
  {
    title: "Grandma's Boy",
    year: "2006",
    genre: "Comedy",
    director: "Nicholaus Goosen"
  },
  {
    title: "True Lies",
    year: "1994",
    genre: "Action",
    director: "James Cameron"
  },
  {
    title: "Honey, I Shrunk The Kids",
    year: "1989",
    genre: "Adventure",
    director: "Joe Johnston"
  },
];

// GENRE DATA
let genres = [
  {
    genre: "Documentary",
    description: "A documentary is a non-fictional motion-picture intended to document reality, primarily for the purposes of instruction, education or maintaining a historical record."
  },
  {
    genre: "Drama",
    description: "A drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
  },
  {
    genre: "Comedy",
    description: "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
  },
  {
    genre: "Action",
    description: "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases."
  },
  {
    genre: "Adventure",
    description: "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war"
  },
];

// APP USES
app.use(morgan("common"));

app.use(express.static("public"));

//GET REQUESTS

app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
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
