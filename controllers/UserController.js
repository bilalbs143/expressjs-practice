const { User, Post } = require('../sequelize')
var bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../constants');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const tokenList = {};

exports.login = function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {

        if (user == null) {
            res.status(401).send({ message: "Your given credentials was not correct." });
        } else {

            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    const user = {
                        "email": req.body.email,
                        "name": req.body.name
                    }
                    const token = jwt.sign(user, config.SECRET, { expiresIn: config.TOKENLIFE })
                    const refreshToken = jwt.sign(user, config.REFRESHTOKENSECRET, { expiresIn: config.REFRESHTOKENLIFE })
                    const response = {
                        "status": "Logged in",
                        "token": token,
                        "refreshToken": refreshToken,
                        "user": user
                    }
                    tokenList[refreshToken] = response
                    res.status(200).json(response);
                } else {
                    res.send()
                }
            });
        }
    });
};

exports.register = function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        }
        User.create(data)
            .then(user => res.json(user))
    })

};
