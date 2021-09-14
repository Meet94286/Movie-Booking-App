const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    userid : {
        type : String,
      // required : true,
        unique :true
    },
    email : {
        type : String,
       required : true,
        dropDups : true
    },
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
       required : true
    },
    username : {
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "user",
    },
    isLoggedIn : {
        type : Boolean,
    },
    uuid : {
        type: String,
        required : true
    },
    accesstoken : {
        type : String,
        required:true,
        unique:true
    },
    coupons : Array,
    bookingRequests : Array
    
})

const Users = mongoose.model("users",userSchema);

module.exports = Users;

