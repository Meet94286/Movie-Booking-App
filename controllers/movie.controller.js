const Movies = require("../models/movie.model");

const findAllMovies = (req,res)=>{
if(req.query.status === "PUBLISHED"){
    Movies.find({published : true}).then(data=>res.send(data)).catch(err=>console.error(err));
 }
else if(req.query.status === "RELEASED"){
     Movies.find({released :true}).then(data=>res.send(data)).catch(err=>console.error(err));
 } 
 
 else {
     Movies.find({}).then(data=>res.send(data)).catch(err=>console.error(err));
 }
 
} 

const findOne = (req,res)=>{
    Movies.find({movieid : req.params.id}).then(data=>res.send(data)).catch(err=>console.error(err));
}

const findShows = (req,res)=>{
    Movies.find({movieid : req.params.id}).then(data=>res.send(data[0].shows)).catch(err=>console.error(err));
}
module.exports = { findAllMovies,findOne,findShows}