const { User, Post } = require('../sequelize')

exports.index = function (req, res) {
    Post.findAll()
        .then(posts => res.json(posts))

};

exports.store = function (req, res) {

    Post.create(req.body)
        .then(post => res.json(post))
};

exports.show = function (req, res) {
    Post.findOne(
        {
            where: { id: req.params.id, },
        })
        .then(post => res.json(post))
};

exports.edit = function (req, res) {
    Post.findOne(
        {
            where: { id: req.params.id, },
        })
        .then(post => res.json(post))
};

exports.update = function (req, res) {
    Post.update(req.body, { where: { id: req.params.id } })
        .then(post => res.json(post))
};

exports.destroy = function (req, res) {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(post => res.json(post));
};