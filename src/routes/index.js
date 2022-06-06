const express = require('express');
const app = express();
const userRoute = require('./users.routes');
const addressRoute = require('./address.routes');
const loginRoute = require('./login.routes');
const loginRoute = require('./product.routes');

app.use(express.json());

app.use('/users', userRoute);
app.use('/endereco', addressRoute);
app.use('/login', loginRoute);
app.use('/product', productRoute);

app.use( (error, req, res, next) => {
  if (error instanceof Error) {
      return res.status(404).json({
          status: 'error',
          message: `${error.message}`,
      });
  }

  return res.status(500).json({
      status: 'error',
      message: `Internal server error - ${error.message}`,
  })
  //next(error);
});

module.exports = app;