const mongoose = require("mongoose");

let artistSchema = new mongoose.Schema({
    artistid : {
        type : String,
        required : true,
        unique :true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    wiki_url : {
        type :String,
        required : true
    },
    profile_url : {
        type : String,
        required : true
    },
    movies : {
        type : Array,
        required : true
    }
})

const Artists = mongoose.model("artists",artistSchema);

module.exports = Artists;

