const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../Models/user');
const { auth } = require('../Middleware/auth')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select({ password: 0 });
    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User Already Registered")

    user = new User(_.pick(req.body, ['username', 'email', 'password']))

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save()

    const token = user.generateAuthToken()

    res.header('x-auth-token', token).status(200).send(_.pick(user, ['_id', 'username', 'email']));

})

module.exports = router;