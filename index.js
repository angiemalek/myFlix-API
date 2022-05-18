const express = require("express");
  morgan = require("morgan");

const app = express();

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

// ERROR EVENT HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});

//GET REQUESTS

app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// LISTEN FOR REQUESTS
app.listen(8080, () => {
  console.log("App is listening to port 8080");
});
