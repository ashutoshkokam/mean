const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"must_be_some_long_secret_key");
        next()
    }
    catch (err) {
        res.status(401).json({
            message: 'Auth Failed!'
        })
    }
}