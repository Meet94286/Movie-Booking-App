const {signUp,login, logout, getCouponCode, bookShow}= require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.post("/signup",signUp);
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.post("/bookShow",bookShow);
userRouter.get("/getCouponCode",getCouponCode);
module.exports = userRouter;