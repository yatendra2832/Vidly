require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const genres = require('./Routes/genre')
const customers = require('./Routes/customer')
// Middlewares
app.use(express.json());

// Routes
app.use('/api/genres', genres)
app.use('/api/customers',customers)

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
