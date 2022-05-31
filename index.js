const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

// USE BODY PARSER
app.use(morgan("common"));

app.use(bodyParser.json());

app.use(express.static("public"));

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
let movies = [
  {
    "Title": "The Dawn Wall",
    "Year": "2017",
    "About": "In an unbelievable story of perseverance, free climber Tommy Caldwell and climbing partner Kevin Jorgeson attempt to scale the impossible 3000ft Dawn Wall of El Capitan.",
    "Genre": {
      "Name": "Documentary",
      "Description":"A documentary is a non-fictional motion-picture intended to portray reality, primarily for the purposes of instruction, education or maintaining a historical record."
    },
    "Director": {
      "Name": "Josh Lowell",
      "Birthyear": 1972,
      "Bio": "Josh Lowell is the founder of Big UP Productions and has been producing and directing climbing and outdoor adventure films for nearly 20 years. A passionate climber himself, Lowell and his brother, Brett Lowell, spent seven years documenting Tommy Caldwell’s quest to climb the Dawn Wall, including over 60 days of filming while living on the wall with the climbers. "
  },
},

  {
    "Ttle": "Mr. Brooks",
    "Year": "2007",
    "About": "A well-respected businessman is sometimes controlled by his murder and mayhem-loving alter ego.",
    "Genre": {
      "Name": "Drama",
      "Description": "A drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
    },
    "Director": {
      "Name": "Bruce A. Evans",
      "Birthyear": 1946,
      "Bio": "Bruce Evans was born on June 26, 1902. He was an actor, known for Back Door to Heaven (1939), The Prisoner of Swing (1938) and Flowers from the Sky (1937). He died on February 9, 1978 in Harrison, Maine, USA."
  },
},

  {
    "Title": "Grandma's Boy",
    "Year": "2006",
    "About": "A thirty-five-year-old video game tester has to move in with his grandma and her two old lady roommates.",
    "Genre": {
      "Name": "Comedy",
      "Description": "A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement."
    },
    "Director": {
      "Name": "Nicholaus Goosen",
      "Birthyear": 1978,
      "Bio": "Nicholaus Goossen is a director and producer, known for Grandma's Boy (2006), Sugar and Toys (2019) and Hot for My Name (2020)."
  },
},

  {
    "Title": "True Lies",
    "Year": "1994",
    "About": "A fearless, globe-trotting, terrorist-battling secret agent has his life turned upside down when he discovers his wife might be having an affair with a used-car salesman while terrorists smuggle nuclear war heads into the United States.",
    "Genre": {
      "Name": "Action",
      "Description": "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases."
    },
    "Director": {
      "Name": "James Cameron",
      "Birthyear": 1954,
      "Bio": "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition."
  },
},

  {
    "Title": "Honey, I Shrunk The Kids",
    "Year": "1989",
    "About": "The scientist father of a teenage girl and boy accidentally shrinks his and two other neighborhood teens to the size of insects. Now the teens must fight diminutive dangers as the father searches for them.",
    "Genre": {
      "Name": "Adventure",
      "Description": "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war."
    },
    "Director": {
      "Name": "Joe Johnston",
      "Birthyear": 1950,
      "Bio": "Joseph Eggleston Johnston II is an American film director from Texas who is known for directing the cult classic film The Rocketeer, Jumanji, Honey, I Shrunk the Kids, The Wolfman, October Sky, The Pagemaster, Jurassic Park III and Captain America: The First Avenger. He was an art director for Raiders of the Lost Ark and the Star Wars original trilogy."
    },
  },
];


//GET REQUESTS

app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// CREATE NEW USER
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send("users need names");
  }
})

//CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find(user =>user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send("${movieTitle} has been added to user ${id}'s array");;
  } else {
    res.status(400).send("no such user");
  }
})

//DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find(user =>user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send("${movieTitle} has been removed from user ${id}'s array");
  } else {
    res.status(400).send("no such user");
  }
})

//DELETE
app.delete("/users/:id", (req, res) => {
  const {id,} = req.params;

  let user = users.find(user =>user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send("user ${id} has been deleted");
  } else {
    res.status(400).send("no such user");
  }
})

//UPDATE
app.put("/users/:id", (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find(user =>user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
})

// READ: GET LIST OF ALL MOVIES
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ: GET ONE MOVIE BY TITLE
app.get("/movies/:title", (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie")
  }
})

//READ: GET GENRE INFO BY GENRE NAME
app.get("/movies/genre/:genreName", (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
  res.status(400).send("No such genre")
  }
})

//READ: GET DIRECTOR INFO BY NAME
app.get("/movies/director/:directorName", (req, res) => {
  const {directorName} = req.params;
  const director = movies.find((movie) => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director")
  }
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
