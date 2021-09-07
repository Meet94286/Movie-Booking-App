const Genres = require("../models/genre.model")

const findAllGenres = (req,res)=>{
    Genres.find({}).then(data=>res.send(data)).catch(err=>console.error(err));
}

module.exports = findAllGenres;