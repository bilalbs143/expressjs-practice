var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');
const { check, validationResult } = require('express-validator');
const { User, Post } = require('../sequelize')


/* login. */
router.post('/login', [
    check('email', 'Email is not correct.').isEmail()
], UserController.login);

/* register. */
router.post('/register', [
    check('email', 'Email is not correct.').isEmail(),
    check('email').custom(value => {
        return User.findOne({ where: { email: value } }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password', 'Password must be greater than 5 charachters.').isLength({ min: 5 })
], UserController.register);


module.exports = router;
