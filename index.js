const express = require("express");
  bodyParser = require("body-parser");
  morgan = require("morgan");
  uuid = require("uuid");

const app = express();

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect("mongodb://localhost:27017/[myFlixDB]", { useNewUrlParser: true, useUnifiedTopology: true });

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

// READ (GET) LIST OF ALL MOVIES MONGOOSE WORKS
app.get("/movies", (req, res) => {
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

//GET REQUEST TO RETURN USER BY USERNAME Works but keeps returning same user betty
app.get("/users/:Name", (req, res) => {
  Users.findOne({ Name: req.params.Name })
    .then((user) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ (GET) ONE MOVIE BY TITLE MONGOOSE WORKS
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// RETURN (GET) DATA ABOUT A GENRE BY NAME/TITLE
app.get("movies/Genre/:Name", (req, res) => {
  Movies.findOne({ "Genre.Name" : req.params.Name })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//RETURN (GET) DATA ABOUT A DIRECTOR WORKS
app.get("/movies/Director/:Name", (req, res) => {
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
  Users.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Name + "already exists");
      } else {
        Users
          .create({
            Name: req.body.Name,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
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
app.put("/users/:Name", (req, res) => {
  Users.findOneAndUpdate({ Name: req.params.Name },
    { $set:
      {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
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
app.delete("/users/:Name", (req, res) => {
  Users.findOneAndRemove({ Name: req.params.Name })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Name + " was not found");
      } else {
        res.status(200).send(req.params.Name + " was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// CREATE (POST) ADD MOVIE TO USER FAVORITES BY MOVIE TITLE MONGOOSE
app.post("/users/:Name/movies/:Title", (req,res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, {
    $push: { favoriteMovies: req.params.Title}
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
app.delete("/users/:Name/movies/:Title", (req,res) => {
  Users.findOneAndUpdate({ Name: req.params.Name }, {
    $pull: { favoriteMovies: req.params.Title}
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
