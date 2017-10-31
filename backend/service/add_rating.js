const path = require('path');
var Rating=require(path.join(__dirname,'..','/models/ratings.js'));
var Professor=require(path.join(__dirname,'..','/models/professor.js'));
var Course=require(path.join(__dirname,'..','/models/course.js'));
var User=require(path.join(__dirname,'..','/models/Users.js'));

module.exports = function(req,res,next){
    var class_id = req.body.class_id;
    var prof_id = req.body.prof_id;
    var difficulty_rating = req.body.difficulty_rating;
    var overall_rating = req.body.overall_rating;
    var workload_rating = req.body.workload_rating;
    var comment = req.body.comment;

    var user_id=(req.session.passport.user);
    if(!user_id){
      res.status(401)
      return res.json({message:"user is not authenticated"})
    }

    User.findOne({'_id':user_id},function(err, user){
      console.log(user);
      if(err){
        return next(err)
      }
      User.findOne({'rated_classes.course': class_id, 'rated_classes.professor': prof_id},function(err,this_rating){
        if(this_rating){
          console.log(1111);
          return res.json({message:"This user has already rated this course"})
        }
      })
    })

    Rating.findOne({'class_id': class_id, 'prof_id': prof_id}, function(err, this_rating) {
        if (this_rating) {
            // Rating already exists
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
            return res.json({message: "success"});
        }
    });
    User.findOne({"_id":user_id},function(err,user){
      console.log(user);
      user.rated_classes.push({course:class_id,professor:prof_id});
      user.save();
    })
};
