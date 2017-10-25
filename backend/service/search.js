const path = require('path');
const mongoose = require('mongoose');
var Course = require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));
var Professor = require(path.join(__dirname,'..','/models/professor.js'));

module.exports = function(req, res) {
    var query = req.querymen;
    /*
    // Iterate through all courses and add keywords -- only run once
    Course.find().then(function(courses) {
        courses.forEach(function(course) {
            var new_course = new Course({
                course_num: course.course_num,
                course_name: course.course_name,
                dept: course.dept,
                credits: course.credits,
                ger: course.ger,
                opus_id: course.opus_id
            });
            Course.remove({_id: course.id}, function(err) {
                
            });
            new_course.save();
        });
        res.json();
    });
    */
    Course.find(query.query, query.select, query.cursor).then(function(courses) {
        var this_resp = [];
        // Iterate thrugh courses
        for (var i = 0; i < courses.length; i++) {
            console.log(courses[i].course_num);
            // Iterate through each professor in each course
            for (var j = 0; j < courses[i].professors.length; j++) {
                // Find matching professor
                Professor.findOne({'name': courses[i].professors[j]}, function(err, professor) {
                    if (err) {
                        // error finding a professor
                    } else {
                        // Find matching rating
                        Rating.findOne({'class_id': courses[i].course_num, 'prof_id': professor._id}, function(err, rating) {
                            if (err) {
                                // error finding a rating
                            } else {
                                var course_professor_rating = {
                                    course_num: courses[i].course_num,
                                    professor: courses[i].professors[j],
                                    average_difficulty: rating.total_difficulty / rating.rating_count,
                                    average_overall: rating.total_overall / rating.rating_count,
                                    average_workload: rating.total_workload / rating.rating_count
                                }
                                // add card to response
                                this_resp.push(course_professor_rating);
                            }
                        });
                    }
                });
            }
        }
        // Average Scores
        return res.json(this_resp);
    });
};
