const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/userController')
const UserMiddleWare = require('./../middleWares/UserMiddleWare')

router
    .route('/')
    .get(UserController.getAllUsers)
    .post(UserMiddleWare.checkPostBody, UserController.setNewUser);

router
    .route('/:id')
    .get(UserMiddleWare.isExistUser, UserController.getUserById)
    .patch(UserMiddleWare.isExistUser, UserController.updateUserById)
    .delete(UserMiddleWare.isExistUser, UserController.deleteUserById)

module.exports = router;