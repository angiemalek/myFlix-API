const express = require("express");
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
