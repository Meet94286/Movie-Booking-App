const Artists = require("../models/artist.model")

const findAllArtists = (req,res)=>{
    Artists.find({}).then(data=>res.send(data)).catch(err=>console.error(err));
}

module.exports = findAllArtists;