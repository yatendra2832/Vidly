require('dotenv').config();
const express = require('express');
const app = express();
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

require('./startup/logging')
require('./startup/routes')(app);
require('./startup/db')()

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is Running at PORT : ${port}`)
})
