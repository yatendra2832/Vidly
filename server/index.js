require('dotenv').config();
const express = require('express');
const app = express();

require('./startup/logging')
require('./startup/routes')(app);
require('./startup/db')()
require('./startup/validation')

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is Running at PORT : ${port}`)
})
