// const http = require("http");
const db_url = require("./config/db.config");

 port = 3003;

// const routeMap = {
//     "/movies" : "All Movies Data in JSON format from Mongo DB",
//     "/genres" : "All Genres Data in JSON format from Mongo DB",
//     "/artists" : "All Artists Data in JSON format from Mongo DB"
// }

// const app = http.createServer((req,res)=>{
//     if(routeMap[req.url]){
//         res.writeHead(200,{"Content-type": "text/html"});
//         res.end(routeMap[req.url]);
//     }else{
//         res.writeHead(404,{"Content-type": "plain/text"});
//         res.end()
//     }
// })

const express = require("express");
 body_Parser = require("body-parser");
const cors = require("cors");
const app = express();
const movieRouter = require("./routes/movie.routes");
const genreRouter = require("./routes/genre.routes");
const artistRouter = require("./routes/artist.routes");
const userRouter = require("./routes/user.routes");


const corsOptions = {
  origin : "http://localhost:8085/",
  status : 200,
  methods : "GET , PUT"
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




app.listen(port,console.log(port));
module.exports = app;


const db = require("./models/index");

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
