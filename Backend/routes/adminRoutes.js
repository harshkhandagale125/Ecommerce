const express=require('express');
const router=express.Router()

const adminController=require('../controller/adminController')
const{isAdmin,resolveJwt} = require("../utils/auth")

router.get('/getUsersList', 
resolveJwt,
isAdmin,
adminController.getUserList
)
router.put("/updateStatus",isAdmin,adminController.updateUserStatus)
router.put("/updateRole",isAdmin,adminController.updateUserRole)


module.exports = router