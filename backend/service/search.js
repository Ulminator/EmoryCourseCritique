const path = require('path');
const mongoose = require('mongoose');
var Course = require(path.join(__dirname,'..','/models/course.js'));

module.exports = function(req, res) {
    var query = req.querymen;
    console.log(query);
    Course.find(query.query, query.select, query.cursor).then(function(courses) {
        res.json(courses);
    });
};
