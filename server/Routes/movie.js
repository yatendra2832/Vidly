const express = require('express');
const router = express.Router();
const { Movie, validateMovie } = require('../Models/movie')
const { Genre } = require('../Models/genre');
const { auth } = require('../Middleware/auth');
// GET : Getting all the movies
router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('name')
    res.status(200).send(movie);
})

// GET : getting movie with the given id 
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).send('Movie With the Given Id Was not found')

    res.status(200).send(movie);
})

// POST : Creating the data to the database
router.post('/',auth, async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status('Genre With the given id Was not Exist');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    });

    movie = await movie.save();
    res.status(200).send(movie);


})

// PUT : Upating the Data with the given id 
router.put('/:id', auth,async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Genre with the Given Id Not Exist !');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock
    }, {
        new: true
    })

    res.status(200).send(movie);

})

// DELETE : Deleting the movie with the given id 
router.delete('/:id',auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) return res.status(404).send('Movie With the given id was not found ');

    res.status(200).send({ message: `Delete the Movie:${movie}` })
})

module.exports = router