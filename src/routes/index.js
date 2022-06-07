const express = require('express');
const userRoute = require('./users.routes');
const addressRoute = require('./address.routes');
const loginRoute = require('./login.routes')
const productRoute = require('./product.routes');
const errors = require('@Middleware/errors')
const loginRoute = require('./login.routes');
const comentarioRoute = require('./comentario.routes');
const produtoRoute = require('./product.routes');

const app = express();

app.use(express.json());
app.use('/product', productRoute);
app.use('/users', userRoute);
app.use('/endereco', addressRoute);
app.use('/login', loginRoute);
app.use('/comentarios', comentarioRoute);
app.use('/produto', produtoRoute);

app.use(errors);

module.exports = app;
