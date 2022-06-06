const express = require('express');
const route = express();
const LoginController = require('@login/controller/LoginController');
const res = require('express/lib/response');

const loginController = new LoginController();

//route.post('/', loginController.signIn);
route.post('/', (req,res) => {
    return res.json({mesg: "okj"})
});

module.exports = route;