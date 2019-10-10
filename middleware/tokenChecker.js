const jwt = require('jsonwebtoken');
const config = require('../constants');

module.exports = (req, res, next) => {

    var token = req.headers['x-access-token'] || req.headers['authorization'];


    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
}