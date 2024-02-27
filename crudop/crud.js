const express = require("express")

const router = express.Router()

const {updateProfile, getUserList} = require("./updataprofile/updataProfileRoutes")

const {getNotificationList,updateApproved,rejectUpdate} = require("./notification/notificationRoutes")

const {signup,createUserByAdmin, login} =require("../crudop/login-and-signup/login-signup")

const {admin} = require("../crudop/admin/adminRoutes")



router.post("/update/userprofile", updateProfile)

router.get('/getuser',getUserList)

router.get('/notification',getNotificationList)

router.put('/notification',updateApproved)

router.delete('/notification',rejectUpdate);

router.post('/signup', signup);

router.post('/createuser', createUserByAdmin);

router.post('/login',login);

router.post('/admin', admin);







module.exports=router