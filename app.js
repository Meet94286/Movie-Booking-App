const express = require("express");
 body_Parser = require("body-parser");
const cors = require("cors");
const app = express();
const movieRouter = require("./routes/movie.routes");
const genreRouter = require("./routes/genre.routes");
const artistRouter = require("./routes/artist.routes");
const userRouter = require("./routes/user.routes");


const corsOptions = {
  origin : "http://localhost:3000",
  optionsSuccessStatus : 200,
  //methods : "GET , PUT"
}

app.use(cors(corsOptions));
app.use(body_Parser.json());
app.use(body_Parser.urlencoded({extended : true}))




app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

app.use("/api/movies",movieRouter);
app.use("/api/genres",genreRouter);
app.use("/api/artists",artistRouter);
app.use("/api/auth",userRouter)

const db = require("./models/index");
const db_url = require("./config/db.config");

db.mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  module.exports = app;
