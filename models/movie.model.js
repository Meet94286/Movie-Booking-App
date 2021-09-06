const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
    movieid : {
        type : Number,
        required : true,
        unique :true
    },
    title : {
        type : String,
        required : true
    },
    published : {
        type : Boolean,
        required : true
    },
    release: {
        type : Boolean,
        required : true
    },
    poster_url: {
        type : String,
        required : true
    },
    release_date : {
        type : String,
        required : true
    },
    publish_date :{
        type : String,
        required : true
    },
    artists : {
        type : Array,
        required : true
    },
    genres : {
        type : Array,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    critic_rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    trailer_url : {
        type : String,
        required : true
    },
    wiki_url : {
        type : String,
        required : true
    },
    story_line : {
        type : String,
        required : true
    },
    shows : {
        type : Array,
        required : true
    }    
})

const Movies = mongoose.model("movies",movieSchema);
module.exports = Movies;

