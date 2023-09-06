const express=require('express');
const mongoose=require('mongoose');
const router=express.Router()

const usercontroller=require('../controller/usercontroller')

router.post('/register',usercontroller.registerUser);
router.post('/login',usercontroller.login);
router.put('/updateUser/:id',usercontroller.updateUser);
router.delete('/deleteUser/:id',usercontroller.deleteUser);
router.get("/logout",usercontroller.logout);

module.exports = router