const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 12
    },
    isGold: {
        type: Boolean,
        default: false
    }
})

const Customer = mongoose.model('Customer', customerSchema);

// GET : getting all the customers
router.get('/', async (req, res) => {
    const customer = await Customer.find();
    res.status(200).send(customer);
})

// GET : getting the customer with the given id 
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send("Customer With the given id Not exist");

    res.status(200).send(customer);
})

// POST : Creating the customer 
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save();
    res.status(200).send(customer);

})

// PUT : Update the Customer with the given id 
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, { new: true })
    if (!customer) return res.status(404).send('Customer with the Given id Was not Found ');

    res.status(200).send(customer);
})

// DELETE : Delete the cusomter with the given id 
router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('Customer with the Given id Was not Found ');

    res.status(200).send(customer);
})

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(12).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema)
}

module.exports = router;