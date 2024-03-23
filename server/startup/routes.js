const express = require('express');
const genres = require('../Routes/genre')
const customers = require('../Routes/customer')
const movies = require('../Routes/movie');
const rentals = require('../Routes/rental');
const users = require('../Routes/user');
const auth = require('../Routes/auth');
const { error } = require('../Middleware/error');
module.exports = function (app) {
    // Middlewares
    app.use(express.json());
    // Routes
    app.use('/api/genres', genres)
    app.use('/api/customers', customers)
    app.use('/api/movies', movies)
    app.use('/api/rentals', rentals)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error);

}