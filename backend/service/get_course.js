const path = require('path');
var Course=require(path.join(__dirname,'..','/models/course.js'));
var Rating = require(path.join(__dirname,'..','/models/ratings.js'));
var Professor = require(path.join(__dirname,'..','/models/professor.js'));

module.exports = function(res, query_string) {
    Course.find({'course_num': query_string['course']}, function(err, this_course) {
        if (err) {
            // findOne error
            res.json({error: err});
        } else {
            if (this_course[0]) {
                // Course found
                var this_course=this_course[0];

                var count=this_course.professors.length;
                var numSections=count;
                var total_difficulty=0;
                var total_overall=0;
                var total_workload=0;
                var this_resp = [];

                this_course.professors.forEach(function(profName) {

                // Find matching professor
                    Professor.find({'name': profName}, function(err, professor) {
                        if (err) {
                            return next(err)
                            // error finding a professor
                        } else if (professor) {
                            // Find matching rating
                            Rating.find({'class_id': this_course.course_num, 'prof_id': profName}, function(err, rating) {
                                if(err){
                                  return next(err)
                                }
                                if (!rating[0]) {
                                    // error finding a rating
                                    console.log(profName);
                                    
                                    // add card to response
                                    sendcprof(null, false);


                                } else {
                                    var rating=rating[0];
                                    var course_professor_rating = {
                                        professor: profName,
                                        average_difficulty: (rating.total_difficulty / rating.rating_count).toFixed(2),
                                        average_overall: (rating.total_overall / rating.rating_count).toFixed(2),
                                        average_workload: (rating.total_workload / rating.rating_count).toFixed(2)
                                    }
                                    // add card to response
                                    sendcprof(course_professor_rating, rating.rating_count!=0);
                                }

                            }).lean().limit(1);

                        }
                    }).limit(1).lean();

                });
                // Pass data to sendJson
                function sendcprof(send, add) {
                    if(add)
                    {
                        total_overall+=Number(send.average_overall);
                        total_workload+=Number(send.average_workload);
                        total_difficulty+=Number(send.average_difficulty);
                    }
                    else
                    {
                        numSections--;
                    }
                    if(send)
                        this_resp.push(send);
                    count--;
                    if(count==0)
                    {
                        res.json({
                            course_num: this_course.course_num,
                            course_name: this_course.course_name,
                            credits: this_course.credits,
                            ger: this_course.ger,
                            description: this_course.description,
                            course_avg_overall: (total_overall/numSections).toFixed(2),
                            course_avg_difficulty: (total_difficulty/numSections).toFixed(2),
                            course_avg_workload: (total_workload/numSections).toFixed(2),
                            sections: this_resp
                        });
                    }
                }
            } 

            else {
                // Course not found, show 404 or something
                res.json({message: 'course not found'});
                //res.redirect('/404');
            }
        }
    }).lean().limit(1);
};
