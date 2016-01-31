const uuid = require('uuid');
var db = require('../../services/lowdb');
var only = require('only');

module.exports = {
    create: function (req, res) {
        db('courses').push({
            id: uuid(),
            start: req.body.start,
            location: req.body.location,
            instructor: req.body.instructor
        });
        res.json({isSuccess: true});
    },

    list: function (req, res) {
        var courses = db('courses').value();
        res.json(courses);
    },

    update: function (req, res) {
        var params = only(req.body, 'start location instructor');

        db('courses')
            .chain()
            .find({id: req.body.id})
            .assign(params)
            .value();

        res.json({isSuccess: true});
    },

    destroy: function (req, res) {
        db('courses').remove({id: req.query.id});

        res.json({isSuccess: true});
    }
};