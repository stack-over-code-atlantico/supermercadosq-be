const express = require('express');
const app = express();
const usuarioRepositorio = require('./modules/entities/Usuario/repository/usuarioRepository');

app.get('/', async (req, res) => {
    const users = await usuarioRepositorio.usersRead();
    return res.json(users);
});

app.listen(3000, () => {
    console.log("Hello world! Beautiful time s2!");
});

