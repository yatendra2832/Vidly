require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
require('./startup/routes')(app);

const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database Connection Successfull')
        app.listen(port, () => {
            console.log(`Server is Running at PORT : ${port}`)
        })
    })
    .catch((err) => {
        console.log('Database Connection Failed :', err)
    })
