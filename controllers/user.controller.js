const { users } = require("../models");
const { db } = require("../models/user.model");
const Users = require("../models/user.model");

const signUp = (req,res)=>{
  
  const username = req.body.username;
  const password = req.body.password;

    if(!username && !password){
        res.status(400).send({ message: "Please provide email and password to continue." });
      return;
    }
    
   

    if(username == "user" && password == "user@123"){
        res.status(400).send({ message: "Sorry, You cannot register as ADMIN." });
        return;
    }

      Users.findOne({username : username,password:password},(err,user)=>{

        if(err || user === null){ // if user not found from username and password then add new user

    

            const newUser = new Users({
             
                email : req.body.email,
                password: req.body.password,
                username : req.body.username,
                contact : req.body.contact,
                role : req.body.role ? req.body.role  :"user",
                isLoggedIn : true,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                userid : req.body.userid,
                
              });

              newUser.save((err, user) => {
                if (err)
                  return res.status("400").send(err.message || "some error occurred");
                res.status(200).send("Uswr added at database");
              });
            } else {
              res.status(400).send("User Already Exists.");
            }
          }
          )}


const login = (req,res)=>{
 
   

   if(!req.body.username && !req.body.password){
    res.status(400).send({ message: "Please provide username and password to continue." });
    return;
   }
   
   Users.findOne({username : req.body.username,password:req.body.password},(err,user)=>{
     if(err || user === null){
       res.status(401).send({message : "Username or Password is incorrect"});

     }
     else{
       user.isLoggedIn = true;

       Users.findOneAndUpdate({username : req.body.username,password:req.body.password},user,{new:true})
       .then(data=>{
         if(!data){
           res.status(404).send({message : "Some error occured please try again try later"});
         }
         else
           res.send({
            "first_name" : data.first_name,
            "last_name" : data.last_name,
            "email" : data.email,
            "isLoggedIn": true,
            "role" : data.role,
            "contact" : data.contact
           }).status(200);
         
       }).catch(err=>{
         res.status(5000).send({message : "You are already logged in"});

       })
     }
   })

}

const logout = (req,res)=>{
     if(!req.body.id){
      res.status(400).send({ message: "Please provide user Id." });
      return;
     }
     const id = req.body.id;

     Users.findOneAndUpdate({userid : id},{isLoggedIn:false},{new:true})
     .then(data=>{
       if(!data){
           res.status(404).send({message : "Some error occured"});
       }
       else{
         res.send("Logged out successfully").status(200);
       }
     }).catch(err=>{
       res.send("Error updating").status(500);
     })
}

module.exports = {signUp,login,logout};
    
    
