const mongoose = require('mongoose');
const Joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
    }
}))

function validateUser(user) {
    const schema = {
        username: Joi.string().minlength(5).maxlength(50).required(),
        email: Joi.string().minlength(5).maxlength(255).email().required(),
        password: Joi.string().minlength(5).maxlength(1024).required()
    }
    return Joi.validate(user, schema)
}

module.exports = { User, validateUser };