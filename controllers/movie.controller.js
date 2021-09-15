const Movies = require("../models/movie.model");


async function findAllMovies(req, res) {
    try {
      const REQ_QUERIES = req.query;
      const DB_QUERY = {};
      if ("status" in REQ_QUERIES) {
        DB_QUERY[REQ_QUERIES["status"].toLowerCase()] = true;
      }
      if ("title" in REQ_QUERIES) {
        DB_QUERY.title = REQ_QUERIES["title"];
      }
      /* for genres and artists
    1. convert the comma separated string to array
    2. build the nested query
    */
      if ("genres" in REQ_QUERIES) {
        const genres = REQ_QUERIES["genres"].split(",");
        DB_QUERY.genres = {};
        DB_QUERY.genres.$all = genres;
      }
      if ("artists" in REQ_QUERIES) {
        const artists = REQ_QUERIES["artists"].split(",");
        //get all the first_names
        const firstNames = artists.map(artist => artist.split(" ")[0]);
        const lastNames = artists.map(artist=>artist.split(" ")[1])
        DB_QUERY["artists.first_name"] = {};
        DB_QUERY["artists.last_name"] = {};
        DB_QUERY["artists.first_name"]["$in"] = firstNames;
        DB_QUERY["artists.last_name"]["$in"] = lastNames;
      }
      const results = await Movies.find(DB_QUERY);
      res.json(results);
    } catch (err) {
      res.status(500).send(err.message || "some internal error occurred");
    }
  }

const findOne = (req,res)=>{
    Movies.find({movieid : req.params.id}).then(data=>res.send(data)).catch(err=>console.error(err));
}

const findShows = (req,res)=>{
    Movies.find({movieid : req.params.id}).then(data=>res.send(data[0].shows)).catch(err=>console.error(err));
}






module.exports = { findAllMovies,findOne,findShows}