const path = require('path');
const mongoose = require('mongoose');
var Course = require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));
var Professor = require(path.join(__dirname,'..','/models/professor.js'));

module.exports = function(req, res,next) {
    var query = req.querymen;

    // Iterate through all courses and add keywords -- only run once
    /*
    Course.find().then(function(courses) {
        courses.forEach(function(course) {
            var new_course = new Course({
                course_num: course.course_num,
                course_name: course.course_name,
                dept: course.dept,
                credits: course.credits,
                ger: course.ger,
                opus_id: course.opus_id,
                professors: course.professors,
                description: course.description,
                ratings:course.ratings
            });
            Course.remove({_id: course.id}, function(err) {

            });
            new_course.save();
        });
        res.json();
    });
    */


    var this_resp = [];
    Course.find(query.query, query.select, query.cursor).then(function(courses) {

        var count=0;
        for (var i = 0; i < courses.length; i++) {
        	count+=courses[i].professors.length;
    	}
    	console.log(count);
    	// Iterate thrugh courses
        courses.forEach(function(courseItem) {
        	// Iterate through each professor in each course
            courseItem.professors.forEach(function(profName) {

                // Find matching professor
                Professor.findOne({'name': profName}, function(err, professor) {
                    if (err) {
                        return next(err)
                        // error finding a professor
                    } else if (courseItem) {
                        // Find matching rating
                        Rating.findOne({'class_id': courseItem.course_num, 'prof_id': profName}, function(err, rating) {
                            if(err){
                              return next(err)
                            }
                            if (!rating) {
                                // error finding a rating
                                console.log(profName);
                                var course_professor_rating = {
                                    course_num: courseItem.course_num,
                                    course_name: courseItem.course_name,
                                    professor: profName,
                                    average_difficulty: 'null',
                                    average_overall: 'null',
                                    average_workload: 'null'
                                }
                                // add card to response
                                sendcprof(course_professor_rating);


                            } else {
                            	console.log(profName);
                                var course_professor_rating = {
                                    course_num: courseItem.course_num,
                                    course_name: courseItem.course_name,
                                    professor: profName,
                                    average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                    average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                    average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                }
                                // add card to response
                                sendcprof(course_professor_rating);
                            }

                        });

                    }
                });

            });

        });

        // Pass data to sendJson
        function sendcprof(send) {
            this_resp.push(send);
            count--;
            if(count==0)
               sendJson(this_resp);
        }

    });
    function sendJson(send){
    	console.log(send);
    	return res.end(JSON.stringify(send));
	}
};
