const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userControllers");

userRouter.post("/signup",userController.signup)

userRouter.post("/signin",userController.signin);

userRouter.post("/logout",userController.logout);

module.exports = userRouter;