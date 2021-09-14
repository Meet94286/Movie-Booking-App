const Users = require("../models/user.model");
const TokenGenerator = require("uuid-token-generator");
const {v4 : uuidv4} = require('uuid');
//const { atob } = require("b2a");
const tokenGenerator = new TokenGenerator();

const signUp = (req,res)=>{
  
  const username = req.body.username;
  const password = req.body.password;

    if(!username && !password){
        res.status(400).send({ message: "Please provide username and password to continue." });
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
                isLoggedIn : false,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                uuid : uuidv4(),
                accesstoken : tokenGenerator.generate(),
                
              });

              newUser.save((err, user) => {
                if (err)
                  return res.status("400").send(err.message || "some error occurred");
                res.status(200).send(user);
              });
            } else {
              res.status(400).send("User Already Exists.");
            }
          }
          )}


 const login = (req,res)=>{
      if(!req.body.username || !req.body.password){
        res.status(400).send("Please provide username and password");
        return;
      }
      Users.findOne({username : req.body.username,password:req.body.password},(err,user)=>{
        if(err || user === null){
          res.status(401).send({message : "Email or password not correct"});
        }
        Users.findOneAndUpdate({accesstoken:user.accesstoken},{isLoggedIn:true},{new:true})
        .then(res.status(200).send("Logged in successfully"))
        .catch(err=>console.log(err));
        })
      }











  const logout = (req,res)=>{
    const uuid = req.body.uuid;
  const update = { isLoggedIn: false, accesstoken: "", uuid: "" };
  Users.findOneAndUpdate({ uuid: uuid }, update, { useFindAndModify: false })
    .then(data => {
      if (data === null) throw new error("unable to logout");
      res.send({ message: "Logged Out successfully." });
    })
    .catch(err => {
      res.status(500).send(err.message);
    });
}

module.exports = {signUp,login,logout};
    

