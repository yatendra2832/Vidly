const express = require('express');
const router = express.Router();
const _ = require('lodash')
const { User, validateUser } = require('../Models/user');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User Already Registered")

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    )

    await user.save()


    res.status(200).send(_.pick(user, ['_id', 'name', 'email']));



})

module.exports = router;