const express = require('express');
const { getAllProducts } = require('../controllers/productController');
const { registerUser, loginUser, userLogout, forgetPassword, getUserDetails, updatePassword, updateProfile, getSingleUser, getAllUser, updateUserRole, deleteUser, } = require('../controllers/userController');
const router = express.Router();
const {isAuthentictedUser,authorizeRole} = require('../middleware/auth')


router.route('/register').post(registerUser) 

router.route('/login').post(loginUser)

router.route('/password/forgot').post(forgetPassword)

router.route("/logout").get(userLogout)

router.route("/me").get(isAuthentictedUser,getUserDetails);

router.route("/password/update").put(isAuthentictedUser,updatePassword)

router.route("/update/me").put(isAuthentictedUser,updateProfile)

router.route("/admin/user").get(isAuthentictedUser,authorizeRole("admin"),getAllUser);

router.route("/admin/user/:id")
.get(isAuthentictedUser,authorizeRole("admin"),getSingleUser)
.put(isAuthentictedUser,authorizeRole("admin"),updateUserRole)
.delete(isAuthentictedUser,authorizeRole("admin"),deleteUser)

module.exports =router;