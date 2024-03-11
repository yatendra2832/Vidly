require('dotenv').config();
const express = require('express');
const app = express();
const Joi = require('joi')


// Middlewares
app.use(express.json()); //adding the middleware for request processing pipeline for parsing the req.body

const genres = [
    { id: 1, name: "Thriller" }, { id: 2, name: "Action" }, { id: 3, name: "Comedy" }
]
app.get('/', (req, res) => {
    res.send("Hello World");
})

// GET : Getting all the genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
})

// GET : Getting the genres by their id 
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('The Genre With the given id was not found');

    res.send(genre);
})

// POST : Creating the Genre 
app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.status(200).send(genre);
})

// PUT : Updating the Genre
app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("The Genre Withthe Given Id was not found");

    const { error } = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    genre.name = req.body.name;
    res.status(200).send(genre);
})

// DELETE : Deleting the Genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre With the given id was not found')

    const index = genres.indexOf(genre)
    genres.splice(index, 1);

    res.status(200).send(genre);
})

// Logic for validating the genre
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}





const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is Running at PORT : ${port}`)
})