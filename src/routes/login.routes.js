const express = require('express');
const route = express();
const LoginController = require('@login/controller/LoginController');

const loginController = new LoginController();

route.post('/', loginController.signIn);

module.exports = route;