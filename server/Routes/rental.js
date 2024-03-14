const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const { Rental, validateRental } = require('../Models/rental');
const { Movie } = require('../Models/movie')
const { Customer } = require('../Models/customer')

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).send(rentals);
})

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Customer With the Given id Was not Found");

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send("Invalid Movie");

    if (movie.numberInStock === 0) return res.status(400).send('Movie Not in the Stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();

    res.send(rental);

})

router.delete('/:id',async(req,res)=>{
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) return res.status(404).send('Rental With the given id was not found ');

    res.status(200).send(rental)
})

module.exports = router;