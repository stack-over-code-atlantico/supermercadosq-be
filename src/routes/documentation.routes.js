const express = require('express');
const route = express();
const path = require('path');

route.get('/redoc', (req, res) => {
  const doc = path.resolve('public', 'doc-sq.html');
  res.sendFile(doc);
});

module.exports = route;