const { httpPostRegister,
    httpPostLogin,
    httpPostSetAvatar,
    httpGetAllUsers,
 } = require('./user.controller');

const userRoutes = require('express').Router();

userRoutes.post('/register', httpPostRegister)
userRoutes.post('/login', httpPostLogin)
userRoutes.post('/setAvatar/:id', httpPostSetAvatar)
userRoutes.get('/allUsers/:id', httpGetAllUsers)

module.exports = userRoutes

