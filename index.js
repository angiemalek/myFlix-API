const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });

// USE BODY PARSER
app.use(morgan("common"));

app.use(bodyParser.json());

app.use(express.static("public"));

// USER DATA
let users = [
  {
    id: 1,
    name: "Richard",
    password: "ilovemovies",
    email: "richard@email.com",
    birthday: "5-25-1995",
    favoriteMovies: [],
  },

  {
    id: 2,
    name: "Betty",
    password: "password123",
    email: "uglybetty@email.com",
    birthday: "7-14-2005",
    favoriteMovies: [],
  },

  {
    id: 3,
    name: "Mark",
    password: "hellomoto456",
    email: "markymark@email.com",
    birthday: "9-24-1984",
    favoriteMovies: [],
  },
  {
    id: 4,
    name: "Molly",
    password: "hellomolly",
    email: "mollymcbutter@email.com",
    birthday: "6-18-1981",
    favoriteMovies: [],
  },
  {
    id: 5,
    name: "Hank",
    password: "cowdog123",
    email: "hankthecowdog@email.com",
    birthday: "3-07-1975",
    favoriteMovies: [],
  }
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
      "Bio": "Bruce A. Evans is an American film director, producer and screenwriter best knwon for his work on Stand By Me (1986), Jungle 2 Jungle (1997) and Mr. Brooks (2007)."
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

  {
    "Title":"Terminator 2: Judgment Day",
    "Year": "1991",
    "About": "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
    "Genre": {
      "Name": "Action",
      "Description": "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.",
    },
    "Director": {
      "Name": "James Cameron",
      "Birthyear":"1954",
      "Bio": "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition."
    },
  },

  {
    "Title":"Jumanji",
    "Year": "1995",
    "About": "When two kids find and play a magical board game, they release a man trapped in it for decades - and a host of dangers that can only be stopped by finishing the game.",
    "Genre": {
      "Name": "Adventure",
      "Description": "An adventure film is form of adventure fiction, and is a genre of film. Subgenres of adventure films include swashbuckler films, pirate films, and survival films. Adventure films may also be combined with other film genres such as action, animation, comedy, drama, fantasy, science fiction, family, horror, or war.",
    },
    "Director": {
      "Name": "Joe Johnston",
      "Birthyear":"1950",
      "Bio": "Joseph Eggleston Johnston II is an American film director from Texas who is known for directing the cult classic film The Rocketeer, Jumanji, Honey, I Shrunk the Kids, The Wolfman, October Sky, The Pagemaster, Jurassic Park III and Captain America: The First Avenger. He was an art director for Raiders of the Lost Ark and the Star Wars original trilogy."
    },
  },

  {
    "Title":"The Social Network",
    "Year": "2010",
    "About": "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
    "Genre": {
      "Name": "Drama",
      "Description": "A drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
    },
    "Director": {
      "Name": "David Fincher",
      "Birthyear":"1962",
      "Bio": "David Fincher was born in Denver, Colorado.  When he was 18 years old he went to work for Korty Films in Mill Valley.  He made commercials and eventually moved onto movies."
    },
  },

  {
    "Title":"Howls Moving Castle",
    "Year": "2004",
    "About": "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
    "Genre": {
      "Name": "Animation",
      "Description": "Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
    },
    "Director": {
      "Name": "Hayao Miyazaki",
      "Birthyear":"1941",
      "Bio": "Hayao Miyazaki was born in Tôkyô on January 5, 1941. He started his career in 1963 as an animator at the studio Toei Douga studio, and was subsequently involved in many early classics of Japanese animation. From the beginning, he commanded attention with his incredible drawing ability and the seemingly endless stream of movie ideas he proposed."
    },
  },

  {
    "Title":"Gremlins",
    "Year": "1984",
    "About": "A young man inadvertently breaks three important rules concerning his new pet and unleashes a horde of malevolently mischievous monsters on a small town.",
    "Genre": {
      "Name": "Fantasy",
      "Description": "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds. The genre is considered a form of speculative fiction alongside science fiction films and horror films, although the genres do overlap.",
    },
    "Director": {
      "Name": "Joe Dante",
      "Birthyear":"1946",
      "Bio": "Joe Dante is a graduate of the Philadelphia College of Art. After a stint as a film reviewer, he began his filmmaking apprenticeship in 1974 as trailer editor for Roger Corman's New World Pictures. He made his directorial debut in 1976 with Hollywood Boulevard in 1976."
    },
  },
];


//GET REQUESTS  WORKS

app.get("/", (req, res) => {
  res.send("Welcome to my Movie App!");
});

// CREATE NEW USER
/*app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send("users need names");
  }
}) */

// CREATE(POST) NEW USER MONGOOSE
app.post("/users", (req, res) => {
  User.findOne({ name: req.body.name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.name + "already exists");
      } else {
        users
          .create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
});

// READ (GET) USER BY USERNAME MONGOOSE
/*app.get("/users/:name", (req, res) => {
  User.findOne({ name: req.params.name })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
}); */

app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//UPDATE USER INFO BY NAME
/*app.put("/users/:name", (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find(user =>user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
}) */

//UPDATE USER INFO BY NAME MONGOOSE
app.put("users/:name", (req, res) => {
  Users.findOneAndUpdate({ name: req.params.name },
    { $set:
      {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday
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

//DELETE USER BY USERNAME

/*app.delete("/users/:id", (req, res) => {
  const {id,} = req.params;

  let user = users.find(user =>user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send("user ${id} has been deleted");
  } else {
    res.status(400).send("no such user");
  }
}) */

//DELETE USER BY USERNAME MONGOOSE
app.delete("users/:name", (req, res) => {
  Users.findOneAndRemove({ name: req.params.name })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.name + " was not found");
      } else {
        res.status(200).send(req.params.name + " was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});



//CREATE (POST) ADD MOVIE TO USER FAVORITES

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

// CREATE (POST) ADD MOVIE TO USER FAVORITES BY MOVIE TITLE MONGOOSE
app.post("users/name/movies/:movieTitle", (req,res) => {
  Users.findOneAndUpdate({ name: req.params.name }, {
    $push: { favoriteMovies: req.params.movieTitle}
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

//DELETE MOVIE FROM USERS LIST BY MOVIE TITLE
/*app.delete("/users/:id/:movieTitle", (req, res) => {
  const {id, movieTitle} = req.params;

  let user = users.find(user =>user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send("${movieTitle} has been removed from user ${id}'s array");
  } else {
    res.status(400).send("no such user");
  }
}) */

//DELETE MOVIE FROM USERS LIST BY MOVIE TITLE MONGOOSE
app.delete("users/name/:movieTitle", (req, res) => {
  Users.findOneAndRemove({ name: req.params.movieTitle })
    .then((user) => {
      if(!user) {
        res.status(400).send(req.params.movieTitle + "was not found");
      } else {
        res.status(200).send(req.params.movieTitle + "was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ: GET LIST OF ALL MOVIES
/*app.get("/movies", (req, res) => {
  res.status(200).json(movies);
}); */

// READ (GET) LIST OF ALL MOVIES MONGOOSE
app.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ: GET ONE MOVIE BY TITLE
/*app.get("/movies/:title", (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie")
  }
}) */

// READ (GET) ONE MOVIE BY TITLE MONGOOSE
app.get("movies/:movieTitle", (req, res) => {
  Movies.findOne({ Title: req.params.title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//READ: GET GENRE INFO BY GENRE NAME
/*app.get("/movies/genre/:genreName", (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
  res.status(400).send("No such genre")
  }
}) */

//READ (GET) GENRE INFO BY GENRE NAME MONGOOSE


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
/*app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});*/


// LISTEN FOR REQUESTS
app.listen(8080, () => {
  console.log("App is listening to port 8080");
});
