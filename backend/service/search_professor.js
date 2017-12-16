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
                ratings:course.ratings,
            });
            Course.remove({_id: course.id}, function(err) {

            });
            new_course.save();
        });
        res.json();
    });

    */
    //iterate through all courses and add course_num+course_name keyword -- only run once
    /*
    Course.find().then(function(courses) {
      courses.forEach(function(course) {
        console.log(course.keywords[2]+' '+course.keywords[1]);
        course.keywords.push(course.keywords[2]+' '+course.keywords[1]);
        console.log(course.keywords);
        course.save();
      });
    });
    */


    var this_resp = [];
    Professor.find(query.query, query.select, query.cursor).then(function(professors) {

        var count=professors.length;
        
    	// Iterate thrugh courses
        professors.forEach(function(professor) {
            var numCourses= professor.length;
            var numRating = numProf;
            var total_overall=0;
            var total_difficulty=0;
            var total_workload=0;
            var this_sections=[];
        	// Iterate through each professor in each course
            professor.ratings.forEach(function(profName) {

                
                        // Find matching rating
                        Rating.findOne({'prof_id': professor.name}, function(err, rating) {
                            if(err){
                              return next(err)
                            }
                            if (!rating) {
                                // error finding a rating
                                console.log(profName);
                                var course_professor_rating = {
                                    course_name: profName,
                                    average_difficulty: null,
                                    average_overall: null,
                                    average_workload: null
                                }
                                // add card to response
                                sendcprof(course_professor_rating,false);


                            } else {
                            	console.log(profName);
                                var course_professor_rating = {
                                    professor: profName,
                                    average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                    average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                    average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                }
                                // add card to response
                                sendcprof(course_professor_rating,true);
                            }

                        });

    

            });

            function sendcprof(send,add) {
                if(add)
                {
                    total_overall+=send.average_overall;
                    total_workload+=send.average_workload;
                    total_difficulty+=send.average_difficulty;
                }
                else
                {
                    numRating--;
                }
            this_sections.push(send);
            numProf--;
            if(numProf==0)
            {
               console.log(numRating);
               console.log(total_overall);
               console.log((total_overall/numRating).toFixed(2));
               sendJson(courseItem.course_num, courseItem.course_name,(total_overall/numRating).toFixed(2), (total_workload/numRating).toFixed(2), (total_difficulty/numRating).toFixed(2), this_sections);
            }
                        
        }

        });

        // Pass data to sendJson
        function sendJson(course_num, course_name, overall,workload,difficulty,sections) {
            console.log(overall);
            var course={
                            course_num: course_num,
                            course_name: course_name,
                            course_avg_overall: overall,
                            course_avg_difficulty: difficulty,
                            course_avg_workload: workload,
                            sections: sections
                        }
            this_resp.push(course);
            count--;
            if(count==0)
            {
                return res.end(JSON.stringify(this_resp));
            }
        }

    });
    /*function sendJson(send){
    	console.log(send);
    	return res.end(JSON.stringify(send));
	}*/
};