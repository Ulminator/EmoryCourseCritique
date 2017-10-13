const path = require('path');
var Course = require(path.join(__dirname,'..','/models/course.js'));

module.exports = function(req, res) {
    var query = req.querymen;
    Course.find(query.query, query.select, query.cursor).then(function(courses) {
        res.json(courses);
    });
};
