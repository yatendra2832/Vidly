const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. No Token Provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(500).send("Invalid Token")
    }
}

module.exports = { auth };