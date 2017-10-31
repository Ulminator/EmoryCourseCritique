const path = require('path');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));
var Professor=require(path.join(__dirname,'..','/models/professor.js'));
var Course=require(path.join(__dirname,'..','/models/course.js'));
var Users=require(path.join(__dirname,'..','/models/Users.js'));

module.exports = function(req,res,next){
    var class_id = req.body.class_id;
    var prof_id = req.body.prof_id;
    var difficulty_rating = req.body.difficulty_rating;
    var overall_rating = req.body.overall_rating;
    var workload_rating = req.body.workload_rating;
    var comment = req.body.comment;


    // var user_id=req.session.passport.user;
    // if(!user_id){
    //   res.status(401)
    //   return res.json({message:"user is not authenticated"})
    // }

    // User.findOne({'_id':user_id},function(err, user){
    //   if(err){
    //     return next(err)
    //   }
    //   user.rated_classes.findOne({'class_id': class_id, 'prof_id': prof_id},function(err,this_rating){
    //     if(this_rating){
    //       return res.json({message:"This user has already rated this course"})
    //     }
    //   })
    // })

    Rating.count({'course_num': class_id, 'name': prof_id}, function(err, count) {
        if (count > 0) {
            // Rating already exists
            Rating.findOne({'couese_num': class_id, 'name': prof_id}, function(err, this_rating) {
                if (err) {
                  return next(err);
                    // Rating findOne error
                } else {
                    this_rating.rating_count++;
                    this_rating.total_workload+=workload_rating;
                    this_rating.total_overall+=overall_rating;
                    this_rating.total_difficulty+=difficulty_rating;
                    this_rating.ratings.push({
                        difficulty: Number(difficulty_rating),
                        overall: Number(overall_rating),
                        workload: Number(workload_rating),
                        comment: comment,
                        });
                    this_rating.save();
                    // Add rating to professor
                }
                return res.json({message: "success"});
            });
        } else {
            // Rating doesn't exist
            console.log(class_id);
            var new_rating = new Rating({
                class_id: class_id,
                prof_id: prof_id,
                rating_count: 1,
                total_workload:workload_rating,
                total_overall:overall_rating,
                total_difficulty:difficulty_rating
                });
            new_rating.ratings.push({
                difficulty: Number(difficulty_rating),
                overall: Number(overall_rating),
                workload: Number(workload_rating),
                comment: comment
                });
            new_rating.save(function(err){
            // Add rating to professor
            if(err){
              return next(err)
            }
            Professor.findOne({name:prof_id}, function(err, this_professor) {
                if (err) {
                  return next(err)
                    // Professor findOne error
                } else {
                    this_professor.ratings.push(new_rating._id);
                    this_professor.save();
                }
            });
            Course.findOne({"course_num": class_id}, function(err, this_course) {
                if (err) {
                  return next(err)
                    // Professor findOne error
                } else {
                    this_course.ratings.push(new_rating._id);
                    this_course.save();
                }
            });
          });
            res.json({message: "success"});
        }
    });
    // User.findOne({"_id":user_id},function(user,err){
    //   user.rated_classes.push(class_id);
    // })
};
