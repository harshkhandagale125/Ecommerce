
const express=require('express');

const mongoose=require('mongoose');

const router=express.Router()

 

const {resolveJwt} = require("../utils/auth")

 

const usercontroller=require('../controller/usercontroller')

 

router.post('/register',usercontroller.registerUser);

router.post('/login',usercontroller.login);

router.put('/updateUser/:id',usercontroller.updateUser);

router.delete('/deleteUser/:id',usercontroller.deleteUser);

router.get("/logout",usercontroller.logout);

 

router.post("/send-email-otp",usercontroller.sendEmailForVerification);

router.post("/verify-otp",usercontroller.verifyOtp);

router.post("/reset-password",usercontroller.resetPassword);

 

 

module.exports = router