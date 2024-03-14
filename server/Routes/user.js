const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../Models/user');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User Already Registered")

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    await user.save()
    res.status(200).send(user);



})

module.exports = router;