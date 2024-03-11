require('dotenv').config();
const express = require('express');
const app = express();

const genres = require('./Routes/genre')

// Middlewares
app.use(express.json()); 

// Routes
app.use('/api/genres',genres)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is Running at PORT : ${port}`)
})