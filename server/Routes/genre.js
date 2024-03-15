const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../Models/genre')
const { auth } = require('../Middleware/auth');
const { admin } = require('../Middleware/admin');
// GET : Getting all the genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
})

// GET : Getting the genres by their id 
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The Genre With the given id was not found');

    res.status(200).send(genre);
})

// POST : Creating the Genre 
router.post('/', auth, async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save()

    res.status(200).send(genre);
})

// PUT : Updating the Genre
router.put('/:id', auth, async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    if (!genre) return res.status(404).send("The Genre Withthe Given Id was not found");

    res.status(200).send(genre);
})

// DELETE : Deleting the Genre
router.delete('/:id', auth, admin, async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) return res.status(404).send('Genre With the given id was not found')

    res.status(200).send(genre);
})

module.exports = router;