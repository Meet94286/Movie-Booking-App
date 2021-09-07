const mongoose = require("mongoose");

let genreSchema = new mongoose.Schema({
    genreid : {
        type : Number,
        required : true,
        unique :true
    },
    genre : {
        type : String,
        required : true
    }
})

const Genres = mongoose.model("genres",genreSchema);

module.exports = Genres;