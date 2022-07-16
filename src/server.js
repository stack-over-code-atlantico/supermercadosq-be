require('module-alias/register');
require('express-async-errors');
const app = require('./routes');
const port = 3001;

app.listen(port, () => {
    console.log(`Server's running at port: ${port}`);
});
