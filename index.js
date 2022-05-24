const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

// USE BODY PARSER
app.use(bodyParser.json());

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

let topMovies = [
  {
    title: "",
    director: ""
  },
  {
    title: "",
    director: ""
  },
  {
    title: "",
    director: ""
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
