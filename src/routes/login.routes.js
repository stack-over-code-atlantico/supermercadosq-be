const express = require('express');
const route = express();
const LoginController = require('@login/controller/LoginController')

const loginController = new LoginController();

route.post('/', loginController.signin);


module.exports = route;