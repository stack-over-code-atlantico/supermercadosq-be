const express = require('express');
const cors = require('cors');
const userRoute = require('./users.routes');
const loginRoute = require('./login.routes');
const errors = require('@Middleware/errors');
const comentarioRoute = require('./comment.routes');
const produtoRoute = require('./product.routes');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
app.use(express.json());
app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/comments', comentarioRoute);
app.use('/products', produtoRoute);

app.use(errors);

module.exports = app;
