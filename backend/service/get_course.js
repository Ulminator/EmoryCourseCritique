const path = require('path');
var Course=require(path.join(__dirname,'..','/models/course.js'));

module.exports = function(res, query_string) {
    Course.findOne({'course_num': query_string['course']}, function(err, this_course) {
        if (err) {
            // findOne error
            res.json({error: err});
        } else {
            if (this_course) {
                // Course found
                res.json({
                    course: this_course
                });
            } else {
                // Course not found, show 404 or something
                res.json({message: 'course not found'});
                //res.redirect('/404');
            }
        }
    });
};
