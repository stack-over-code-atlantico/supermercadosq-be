const express = require('express');
const userRoute = require('./users.routes');
const loginRoute = require('./login.routes')
const productRoute = require('./product.routes');
const errors = require('@Middleware/errors')
const comentarioRoute = require('./comment.routes');
const produtoRoute = require('./product.routes');

const app = express();

app.use(express.json());
app.use('/product', productRoute);
app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/comments', comentarioRoute);
app.use('/products', produtoRoute);

app.use(errors);

module.exports = app;
