const express = require('express');
const router = express.Router();
const Joi = require('joi')
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}))

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
router.post('/', async (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save()

    res.status(200).send(genre);
})

// PUT : Updating the Genre
router.put('/:id', async (req, res) => {

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
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) return res.status(404).send('Genre With the given id was not found')

    res.status(200).send(genre);
})

// Logic for validating the genre
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;