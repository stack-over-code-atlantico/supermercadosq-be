require('module-alias/register');
require('express-async-errors');
const app = require('./routes');

app.listen(3000, () => {
    console.log("Hello world! Beautiful time s2!");
});
